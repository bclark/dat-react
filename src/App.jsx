import { useState, useEffect } from "react";
import {
  Modal, Box, TextField, Button, Checkbox, FormControlLabel, Typography,
  Container, Stack, Grid
} from "@mui/material";
import { supabase } from "./utils/supabase";
import ActivityTable from "./components/ActivityTable";

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

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Dog Activities
      </Typography>

      {/* Buttons for each activity */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ flexWrap: "wrap", mb: 3 }}>
        {activityTypes.map((type) => (
          <Button key={type} variant="contained" onClick={() => handleOpen(type)}>
            {type}
          </Button>
        ))}
      </Stack>

      {/* Activities Table */}
      <ActivityTable activities={activities} handleOpen={handleOpen} />

      {/* Modal for editing activity */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 3, sm: 4 }, // Adds more padding on mobile
            borderRadius: "16px",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editMode ? `Edit ${selectedActivity}` : `New ${selectedActivity}`}
          </Typography>
          <TextField
            label="Timestamp"
            type="datetime-local"
            fullWidth
            value={createdAt.slice(0, 16)}
            onChange={(e) => setCreatedAt(e.target.value)}
            sx={{ mb: 2 }}
          />
          {(selectedActivity === "Walk" || selectedActivity === "Backyard") && (
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <FormControlLabel control={<Checkbox checked={isPoopChecked} />} label="Poop" />
              <FormControlLabel control={<Checkbox checked={isPeeChecked} />} label="Pee" />
            </Stack>
          )}
          <TextField label="Notes" multiline rows={3} fullWidth value={notes} sx={{ mb: 2 }} />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button variant="contained">Save</Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default App;