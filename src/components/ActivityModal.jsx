import { Modal, Box, TextField, Button, Checkbox, FormControlLabel, Typography, Stack } from "@mui/material";

const ActivityModal = ({ 
  open, 
  handleClose, 
  editMode, 
  selectedActivity, 
  createdAt, 
  setCreatedAt, 
  notes, 
  setNotes, 
  isPoopChecked, 
  setIsPoopChecked, 
  isPeeChecked, 
  setIsPeeChecked, 
  saveActivity,
  handleDelete  // Add this prop
}) => {
  return (
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
            <FormControlLabel control={<Checkbox checked={isPoopChecked} onChange={(e) => setIsPoopChecked(e.target.checked)} />} label="Poop" />
            <FormControlLabel control={<Checkbox checked={isPeeChecked} onChange={(e) => setIsPeeChecked(e.target.checked)} />} label="Pee" />
          </Stack>
        )}
        <TextField label="Notes" multiline rows={3} fullWidth value={notes} onChange={(e) => setNotes(e.target.value)} sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="contained" onClick={saveActivity}>Save</Button>
          <Stack direction="row" spacing={1}>
            {editMode && (
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ActivityModal;