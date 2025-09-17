import { useState, useEffect } from "react";
import {
  Button, Typography,
  Container, Stack, Box, ThemeProvider,
  FormControl, Select, MenuItem,
  InputLabel
} from "@mui/material";
import { modernTheme, geocitiesTheme, hackerTheme, momaTheme, cartoonTheme, dachshundTheme, samuraiTheme, birthdayTheme } from './utils/themes';

import { supabase } from "./utils/supabase";
import ActivityTable from "./components/ActivityTable";
import ActivityModal from "./components/ActivityModal";
import Stats from "./components/Stats";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityId, setActivityId] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [notes, setNotes] = useState("");
  const [isPoopChecked, setIsPoopChecked] = useState(false);
  const [isPeeChecked, setIsPeeChecked] = useState(false);
  const [statsExpanded, setStatsExpanded] = useState(false);
  const [siteName, setSiteName] = useState("Azuki's Activities");
  const [activityCount, setActivityCount] = useState(30);
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    const today = new Date();
    const isBirthday = today.getMonth() === 4 && today.getDate() === 3; // May 3rd (month is 0-based)
    
    if (isBirthday) {
      setSiteName("🎂 Azuki's Birthday 🎉");
      return 'birthday';
    }
    return savedTheme || 'modern';
  });

  const activityTypes = ["Walk", "Yard", "Meal"];
  

  const themes = {
    modern: modernTheme,
    geocities: geocitiesTheme,
    hacker: hackerTheme,
    moma: momaTheme,
    cartoon: cartoonTheme,
    dachshund: dachshundTheme,
    samurai: samuraiTheme,
    birthday: birthdayTheme
  };

  useEffect(() => {
    // Get count from URL parameters
    const params = new URLSearchParams(window.location.search);
    const count = parseInt(params.get('count') || '30', 10);
    console.log('URL count parameter:', count);
    setActivityCount(count);
    fetchActivities(count);
  }, []);

  const fetchActivities = async (limit = activityCount) => {
    console.log('Fetching activities with limit:', limit);
    let query = supabase
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (limit > 0) {
      // Calculate date 30 days ago
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - limit);
      query = query.gte('created_at', thirtyDaysAgo.toISOString());
    }

    const { data, error } = await query;
    console.log('Fetched activities count:', data?.length);

    if (error) {
      console.error("Error fetching activities:", error.message);
    } else {
      setActivities(data);
    }
  };

  const saveActivity = async () => {
    let updatedNotes = notes.trim();

    // Prepend Poop or Pee if applicable
    if (selectedActivity === "Walk" || selectedActivity === "Yard") {
      if (isPoopChecked) {
        updatedNotes = `Poop ${updatedNotes}`;
      }
      if (isPeeChecked) {
        updatedNotes = `Pee ${updatedNotes}`;
      }
    }

    // Convert local time to UTC before saving
    const utcTimestamp = new Date(createdAt).toISOString();

    const activityData = {
      name: selectedActivity,
      created_at: utcTimestamp, // Save in UTC
      notes: updatedNotes,
    };

    if (editMode) {
      const { error } = await supabase
        .from("activities")
        .update(activityData)
        .eq("id", activityId);

      if (error) {
        console.error("Error updating activity:", error.message);
      } else {
        console.log("Activity updated successfully!");
        setNotes("");
      }
    } else {
      const { error } = await supabase.from("activities").insert([activityData]);

      if (error) {
        console.error("Error saving activity:", error.message);
      } else {
        console.log("Activity saved successfully!");
        setNotes("");
      }
    }

    fetchActivities(activityCount);
  };

  const deleteActivity = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("activities").delete().eq("id", id);

    if (error) {
      console.error("Error deleting activity:", error.message);
    } else {
      console.log("Activity deleted successfully!");
      fetchActivities(activityCount); // Refresh the list after deletion
    }
  };

  const handleOpen = (activityName, activity = null) => {
    setSelectedActivity(activityName);

    if (activity) {
      setEditMode(true);
      setActivityId(activity.id);
      const now = new Date(activity.created_at);
      const localTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setCreatedAt(localTime);
      setNotes(activity.notes || "");
      setIsPoopChecked(activity.notes?.toLowerCase().includes("poop"));
      setIsPeeChecked(activity.notes?.toLowerCase().includes("pee"));
      setNotes((prev) => prev.replace(/poop\s*/i, "").replace(/pee\s*/i, ""));
    } else {
      setEditMode(false);
      const now = new Date();
      const localTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setCreatedAt(localTime);
      setIsPoopChecked(false);
      setIsPeeChecked(true);
    }

    setOpen(true);
  };

  const handleSave = async () => {
    await saveActivity(); // Save activity
    fetchActivities();
    handleClose(); // Close the modal after saving
  };

  const handleDelete = async () => {
    await deleteActivity(activityId);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  }

  const exportToCSV = () => {
    // Convert activities to CSV format
    const headers = ['Activity', 'Date' ,'Time', 'Notes'];
    const csvContent = [
      headers.join(','), // Header row
      ...activities.map(activity => {
        const date = new Date(activity.created_at).toLocaleString();
        // Escape quotes in notes and wrap field in quotes to handle commas
        const escapedNotes = activity.notes ? `"${activity.notes.replace(/"/g, '""')}"` : '';
        return [activity.name, date, escapedNotes].join(',');
      })
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'dog_activities.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setCurrentTheme(newTheme);
    localStorage.setItem('selectedTheme', newTheme);
  };

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: currentTheme === 'geocities' ? 'black' : 
                      currentTheme === 'hacker' ? '#000000' : 'white',
          backgroundImage: currentTheme === 'geocities' ? 'url("/sparkles.gif")' : 
                          currentTheme === 'hacker' ? 'url("/matrix.gif")' : 'none',
          backgroundAttachment: 'fixed',
          pt: 4
        }}
      >
        <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center" 
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Typography 
              variant="h4" 
              onClick={exportToCSV}
              sx={{ 
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {siteName}
            </Typography>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="theme-select-label">Theme</InputLabel>
              <Select
                labelId="theme-select-label"
                id="theme-select"
                value={currentTheme}
                label="Theme"
                onChange={handleThemeChange}
              >
                <MenuItem value="modern">Modern</MenuItem>
                <MenuItem value="geocities">GeoCities</MenuItem>
                <MenuItem value="hacker">Hacker</MenuItem>
                <MenuItem value="moma">MoMA</MenuItem>
                <MenuItem value="cartoon">Cartoon</MenuItem>
                <MenuItem value="dachshund">Dachshund</MenuItem>
                <MenuItem value="samurai">Samurai</MenuItem>
                <MenuItem value="birthday">Birthday</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Activity buttons */}
          <Stack 
            direction="row"
            sx={{ 
              mb: 3,
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
              '& > *': {  // This targets all direct children
                margin: '4px !important'  // Override Stack spacing
              }
            }}
          >
            {activityTypes.map((type) => (
              <Button 
                key={type} 
                variant="contained" 
                onClick={() => handleOpen(type)}
                sx={{ 
                  width: '140px',
                  height: '40px'  // Fixed height for consistency
                }}
              >
                {type}
              </Button>
            ))}
          </Stack>

          {/* Stats Section */}
          <Box sx={{ 
            mb: 3, 
            p: 2, 
            bgcolor: 'background.paper', 
            borderRadius: 1,
            boxShadow: 1,
            border: '1px solid rgba(0, 0, 0, 0.12)'
          }}>
            <Stats 
              activities={activities} 
              expanded={statsExpanded}
              onToggle={() => setStatsExpanded(!statsExpanded)}
            />
          </Box>

          {/* Activities Table */}
          <ActivityTable activities={activities} handleOpen={handleOpen} deleteActivity={deleteActivity} />

          {/* Modal for editing activity */}
          <ActivityModal
            open={open}
            handleClose={handleClose}
            editMode={editMode}
            selectedActivity={selectedActivity}
            createdAt={createdAt}
            setCreatedAt={setCreatedAt}
            notes={notes}
            setNotes={setNotes}
            isPoopChecked={isPoopChecked}
            setIsPoopChecked={setIsPoopChecked}
            isPeeChecked={isPeeChecked}
            setIsPeeChecked={setIsPeeChecked}
            saveActivity={handleSave}
            handleDelete={handleDelete}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;