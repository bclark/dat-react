import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { supabase } from "./utils/supabase";
import "./App.css";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); // New state for edit mode
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityId, setActivityId] = useState(null); // ID for the activity being edited
  const [createdAt, setCreatedAt] = useState("");
  const [notes, setNotes] = useState("");
  const [isPoopChecked, setIsPoopChecked] = useState(false);
  const [isPeeChecked, setIsPeeChecked] = useState(false);

  const activityTypes = ["Walk", "Backyard", "Meal"];

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching activities:", error.message);
    } else {
      setActivities(data);
    }
  };

  const handleOpen = (activityName, activity = null) => {
    setSelectedActivity(activityName);
  
    if (activity) {
      // Edit mode: Prefill values
      setEditMode(true);
      setActivityId(activity.id);
      // Convert UTC to local time for datetime-local input
      const now = new Date(activity.created_at)
      const localTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      console.log(localTime); // Example: "2025-01-16T09:30"
      setCreatedAt(localTime);
      setNotes(activity.notes || "");
  
      // Check for 'poop' and 'pee' in the notes
      setIsPoopChecked(activity.notes?.toLowerCase().includes("poop"));
      setIsPeeChecked(activity.notes?.toLowerCase().includes("pee"));
      setNotes((prev) => prev.replace(/poop\s*/i, "").replace(/pee\s*/i, ""));
    } else {
      // New activity mode
      setEditMode(false);
      // Get current UTC timestamp in the correct format for datetime-local
      const now = new Date();
      const localTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      console.log(localTime); // Example: "2025-01-16T09:30"
      setCreatedAt(localTime);
      setIsPoopChecked(false);
      setIsPeeChecked(true); // Default to checked
    }
  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setActivityId(null);
  };

  const saveActivity = async () => {
    let updatedNotes = notes.trim();

    // Prepend Poop or Pee if applicable
    if (selectedActivity === "Walk" || selectedActivity === "Backyard") {
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
      }
    } else {
      const { error } = await supabase.from("activities").insert([activityData]);

      if (error) {
        console.error("Error saving activity:", error.message);
      } else {
        console.log("Activity saved successfully!");
      }
    }

    fetchActivities();
    handleClose();
  };

  const deleteActivity = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("activities").delete().eq("id", id);

    if (error) {
      console.error("Error deleting activity:", error.message);
    } else {
      console.log("Activity deleted successfully!");
      fetchActivities(); // Refresh the list after deletion
    }
  };

  const groupActivitiesByDate = (activities) => {
    return activities.reduce((groups, activity) => {
      const date = new Date(activity.created_at).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
      return groups;
    }, {});
  };

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"></link>

      <div className="header">Dog Activities</div>

      {/* Buttons for each activity type */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {activityTypes.map((type) => (
          <Button
            key={type}
            variant="contained"
            style={{ margin: "5px" }}
            onClick={() => handleOpen(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Activities Table */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {Object.entries(groupActivitiesByDate(activities)).map(([date, activitiesForDate]) => (
          <div key={date} style={{ width: "80%", marginBottom: "20px" }}>
            {/* Date as the section title */}
            <h3 style={{ backgroundColor: "", padding: "10px", borderRadius: "5px", textAlign: "left" }}>
              {date}
            </h3>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                marginTop: "10px",
                border: "1px solid #ccc",
              }}
            >
              {/* Table Header */}
              <thead>
                <tr style={{ backgroundColor: "#b7e1cd" }}>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Time</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Activity</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Notes</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activitiesForDate.map((activity) => {
                  const time = new Date(activity.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={activity.id}>
                      {/* Time Column */}
                      <td
                        style={{ border: "1px solid #ccc", padding: "8px", cursor: "pointer" }}
                        onClick={() => handleOpen(activity.name, activity)}
                      >
                        {time}
                      </td>

                      {/* Activity Column */}
                      <td
                        style={{ border: "1px solid #ccc", padding: "8px", cursor: "pointer" }}
                        onClick={() => handleOpen(activity.name, activity)}
                      >
                        {activity.name}
                      </td>

                      {/* Notes Column */}
                      <td
                        style={{ border: "1px solid #ccc", padding: "8px", cursor: "pointer" }}
                        onClick={() => handleOpen(activity.name, activity)}
                      >
                        {activity.notes?.replace(/poop/gi, "💩").replace(/pee/gi, "🚽") || "—"}
                      </td>

                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {/* <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpen(activity.name, activity)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </Button> */}
                        <Button
                          // variant="outlined"
                          color="error"
                          size="large"
                          onClick={() => deleteActivity(activity.id)}
                        >
                          🚮
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Modal for activity details */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: (theme) => theme.palette.mode === "dark" ? "white" : "black",
              marginBottom: "16px"
            }}
          >
            {editMode ? `Edit ${selectedActivity}` : `New ${selectedActivity}`}
          </Typography>
          <TextField
            label="Timestamp"
            type="datetime-local"
            fullWidth
            value={createdAt.slice(0, 16)}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
          {(selectedActivity === "Walk" || selectedActivity === "Backyard") && (
            <div style={{ display: "flex", gap: "10px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPoopChecked}
                    onChange={(e) => setIsPoopChecked(e.target.checked)}
                  />
                }
                label="Poop"
                sx={{
                  color: (theme) => theme.palette.mode === "dark" ? "white" : "black"
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPeeChecked}
                    onChange={(e) => setIsPeeChecked(e.target.checked)}
                  />
                }
                label="Pee"
                sx={{
                  color: (theme) => theme.palette.mode === "dark" ? "white" : "black"
                }}
              />
            </div>
          )}
          <TextField
            label="Notes"
            multiline
            rows={3}
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={saveActivity}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default App;