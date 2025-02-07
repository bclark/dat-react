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

  return { walkTimingResult, avgPoops, avgPees };
};

export const getTrendIcon = (current, historical) => {
  if (current === 0 || historical === 0) return "→";
  return current > historical ? "↑" : current < historical ? "↓" : "→";
};

export const getWalkTrendIcon = (current, historical) => {
  if (current === "Not enough data" || historical === "Not enough data") return "→";
  const getCurrentMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split('h ').map(str => parseInt(str));
    return (hours * 60) + parseInt(minutes);
  };
  const currentMinutes = getCurrentMinutes(current);
  const historicalMinutes = getCurrentMinutes(historical);
  return currentMinutes > historicalMinutes ? "↑" : currentMinutes < historicalMinutes ? "↓" : "→";
}; 