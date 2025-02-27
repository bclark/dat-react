export const calculateStatsWithTrend = (activities, excludeRecentDays = 0) => {
  const now = new Date();
  const cutoffDate = new Date(now.setDate(now.getDate() - excludeRecentDays));
  
  // For historical data, we'll look at a window of time
  const historicalEndDate = excludeRecentDays > 0 ? 
    new Date(cutoffDate.getTime()) : // 2 days ago
    new Date(); // current time
  
  const historicalStartDate = excludeRecentDays > 0 ?
    new Date(cutoffDate.setDate(cutoffDate.getDate() - 14)) : // 16 days ago
    new Date(now.setDate(now.getDate() - 2)); // 2 days ago for current stats

  // Filter activities for the period we want
  const periodActivities = activities.filter(activity => {
    const activityDate = new Date(activity.created_at);
    return activityDate >= historicalStartDate && activityDate < historicalEndDate;
  });

  // Walk timing calculation
  const walks = periodActivities
    .filter(activity => activity.name === "Walk")
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  let walkTimingResult = "Not enough data";
  let averageMinutes = 0;

  if (walks.length >= 2) {
    let totalMinutes = 0;
    let validIntervals = 0;

    for (let i = 1; i < walks.length; i++) {
      const currentWalk = new Date(walks[i].created_at);
      const previousWalk = new Date(walks[i-1].created_at);
      const diffMinutes = (currentWalk - previousWalk) / (1000 * 60);
      
      if (diffMinutes <= 12 * 60) {
        totalMinutes += diffMinutes;
        validIntervals++;
      }
    }

    if (validIntervals > 0) {
      averageMinutes = Math.round(totalMinutes / validIntervals);
      const hours = Math.floor(averageMinutes / 60);
      const minutes = averageMinutes % 60;
      walkTimingResult = `${hours}h ${minutes}m`;
    }
  }

  // Calculate average walks per day
  const walksByDay = new Map();
  walks.forEach(walk => {
    const date = new Date(walk.created_at).toLocaleDateString();
    if (!walksByDay.has(date)) {
      walksByDay.set(date, 0);
    }
    walksByDay.set(date, walksByDay.get(date) + 1);
  });

  const avgWalksPerDay = walksByDay.size > 0 
    ? Array.from(walksByDay.values()).reduce((sum, count) => sum + count, 0) / walksByDay.size
    : 0;

  // Meal timing calculations
  const meals = periodActivities
    .filter(activity => activity.name === "Meal")
    .map(meal => {
      const date = new Date(meal.created_at);
      const hour = date.getHours();
      return {
        ...meal,
        isMorning: hour >= 4 && hour < 12  // 4 AM to noon for morning
      };
    });

  const morningMeals = meals.filter(meal => meal.isMorning);
  const eveningMeals = meals.filter(meal => !meal.isMorning);

  const calculateAverageTime = (mealArray) => {
    if (mealArray.length === 0) return "Not enough data";
    
    const totalMinutes = mealArray.reduce((sum, meal) => {
      const date = new Date(meal.created_at);
      return sum + (date.getHours() * 60) + date.getMinutes();
    }, 0);

    const avgMinutes = Math.round(totalMinutes / mealArray.length);
    const hours = Math.floor(avgMinutes / 60);
    const minutes = avgMinutes % 60;
    
    // Convert to 12-hour format with AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const morningMealTime = calculateAverageTime(morningMeals);
  const eveningMealTime = calculateAverageTime(eveningMeals);

  // Poop and pee calculations
  const activityDays = new Map();
  periodActivities.forEach(activity => {
    const date = new Date(activity.created_at).toLocaleDateString();
    if (!activityDays.has(date)) {
      activityDays.set(date, { poops: 0, pees: 0 });
    }
    
    const dayStats = activityDays.get(date);
    if (activity.notes) {
      if (activity.notes.toLowerCase().includes('poop')) {
        dayStats.poops++;
      }
      if (activity.notes.toLowerCase().includes('pee')) {
        dayStats.pees++;
      }
    }
  });

  const totalDays = activityDays.size;
  let avgPoops = 0;
  let avgPees = 0;

  if (totalDays > 0) {
    let totalPoops = 0;
    let totalPees = 0;

    activityDays.forEach(day => {
      totalPoops += day.poops;
      totalPees += day.pees;
    });

    avgPoops = totalPoops / totalDays;
    avgPees = totalPees / totalDays;
  }

  return { 
    walkTimingResult, 
    avgPoops, 
    avgPees,
    morningMealTime,
    eveningMealTime,
    avgWalksPerDay
  };
};

export const getTrendIcon = (current, historical) => {
  if (current === 0 || historical === 0) return "→";
  if (current > historical) return "up";
  if (current < historical) return "down";
  return "same";
};

export const getWalkTrendIcon = (current, historical) => {
  if (current === "Not enough data" || historical === "Not enough data") return "same";
  const getCurrentMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split('h ').map(str => parseInt(str));
    return (hours * 60) + parseInt(minutes);
  };
  const currentMinutes = getCurrentMinutes(current);
  const historicalMinutes = getCurrentMinutes(historical);
  if (currentMinutes > historicalMinutes) return "up";
  if (currentMinutes < historicalMinutes) return "down";
  return "same";
};

export const getMealTrendIcon = (current, historical) => {
  if (current === "Not enough data" || historical === "Not enough data") return "same";
  
  const getMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60) + minutes;
  };

  const currentMinutes = getMinutes(current);
  const historicalMinutes = getMinutes(historical);
  
  // For morning meals, earlier is considered "better" (down arrow)
  // For evening meals, later is considered "better" (up arrow)
  const difference = currentMinutes - historicalMinutes;
  if (Math.abs(difference) < 15) return "same"; // If difference is less than 15 minutes, consider it the same
  return difference > 0 ? "up" : "down";
}; 