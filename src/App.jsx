import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
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
      // Edit mode: prefill values
      setEditMode(true);
      setActivityId(activity.id);
      // Convert UTC to local time for datetime-local input
      const now = new Date(activity.created_at)
      const localTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      console.log(localTime); // Example: "2025-01-16T09:30"
      setCreatedAt(localTime);
      // const localTime = new Date(activity.created_at).toISOString();
      // setCreatedAt(localTime);
      setNotes(activity.notes || "");

      // Check for 'poop' and 'pee' in the notes
      setIsPoopChecked(activity.notes?.toLowerCase().includes("poop"));
      setIsPeeChecked(activity.notes?.toLowerCase().includes("pee"));
      /*
      delete the case insensitive "poop" and "pee" from the notes
      */
      setNotes((prev) => prev.replace(/poop\s*/i, "").replace(/pee\s*/i, ""));
    } else {
      // New activity mode
      setEditMode(false);
      // Get current UTC timestamp in the correct format for datetime-local
      const now = new Date();
      const localTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      console.log(localTime); // Example: "2025-01-16T09:30"
      setCreatedAt(localTime);
      setNotes("");
      setIsPoopChecked(false);
      setIsPeeChecked(false);
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
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>{editMode ? "Edit Activity" : "New Activity"}</h2>
          <TextField
            label="Timestamp"
            type="datetime-local"
            fullWidth
            value={createdAt.slice(0, 16)}
            onChange={(e) => setCreatedAt(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          {(selectedActivity === "Walk" || selectedActivity === "Backyard") && (
            <div style={{ marginBottom: "10px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPoopChecked}
                    onChange={(e) => {
                      setIsPoopChecked(e.target.checked);
                      if (e.target.checked) {
                        setNotes((prev) => `${prev}`.trim());
                      } else {
                        setNotes((prev) => prev.replace(/Poop\s*/i, "").trim());
                      }
                    }}
                  />
                }
                label="Poop"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPeeChecked}
                    onChange={(e) => {
                      setIsPeeChecked(e.target.checked);
                      if (e.target.checked) {
                        setNotes((prev) => `${prev}`.trim());
                      } else {
                        setNotes((prev) => prev.replace(/Pee\s*/i, "").trim());
                      }
                    }}
                  />
                }
                label="Pee"
              />
            </div>
          )}
          <TextField
            label="Notes"
            multiline
            rows={3}
            fullWidth
            value= {notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" onClick={saveActivity} sx={{ marginRight: 2 }}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default App;