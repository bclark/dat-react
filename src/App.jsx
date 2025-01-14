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

  const activityTypes = ["Walk", "Backyard", "Breakfast", "Dinner"];

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
      setCreatedAt(activity.created_at);
      setNotes(activity.notes || "");
    } else {
      // New activity mode
      setEditMode(false);
      setCreatedAt(new Date().toISOString());
      setNotes("");
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
      const poopCheckbox = document.getElementById("poop-checkbox");
      const peeCheckbox = document.getElementById("pee-checkbox");

      if (poopCheckbox.checked) {
        updatedNotes = `Poop ${updatedNotes}`;
      }
      if (peeCheckbox.checked) {
        updatedNotes = `Pee ${updatedNotes}`;
      }
    }

    const activityData = {
      name: selectedActivity,
      created_at: createdAt,
      notes: updatedNotes,
    };

    if (editMode) {
      // Update existing activity
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
      // Insert new activity
      const { error } = await supabase.from("activities").insert([activityData]);

      if (error) {
        console.error("Error saving activity:", error.message);
      } else {
        console.log("Activity saved successfully!");
      }
    }

    fetchActivities(); // Refresh activities list
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
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>Activities Log</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "80%",
            marginTop: "20px",
            border: "1px solid #ccc",
          }}
        >
          <thead className="table-header">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Activity</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                  No activities found
                </td>
              </tr>
            ) : (
              activities.map((activity) => {
                const date = new Date(activity.created_at).toLocaleDateString();
                const time = new Date(activity.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr key={activity.id}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{date}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{time}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{activity.name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {activity.notes?.replace(/poop/gi, "💩").replace(/pee/gi, "🚽") || "—"}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpen(activity.name, activity)}
                      >
                        Edit
                      </Button>
                      <Button variant="outlined" onClick={() => deleteActivity(activity.id)}>Delete </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
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
                control={<Checkbox id="poop-checkbox" />}
                label="Poop"
              />
              <FormControlLabel
                control={<Checkbox id="pee-checkbox" />}
                label="Pee"
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