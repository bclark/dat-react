import { Table, TableHead, TableBody, TableRow, TableCell, Button, Paper, Typography, Box, Container } from "@mui/material";

const ActivityTable = ({ activities, handleOpen, deleteActivity }) => {
  // Group activities by date
  const groupActivitiesByDate = (activities) => {
    return activities.reduce((groups, activity) => {
      const date = new Date(activity.created_at).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
      return groups;
    },{});
  };

  const activitiesByDate = groupActivitiesByDate(activities);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        {Object.entries(activitiesByDate).map(([date, activitiesForDate]) => (
          <Paper 
            key={date} 
            elevation={3} 
            sx={{ 
              width: "100%", 
              maxWidth: "800px", 
              mb: 3, 
              p: 2,
              overflowX: "auto"  // Ensures the table doesn't overflow on small screens
            }}
          >
            {/* Date Header */}
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}>
              {date}
            </Typography>

            {/* Table */}
            <Table sx={{ width: "100%" }}>
              <TableHead sx={{ width: "100%", backgroundColor: "#b7e1cd" }}>
                <TableRow >
                  <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Activity</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activitiesForDate.map((activity) => {
                  const time = new Date(activity.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <TableRow key={activity.id} hover>
                      <TableCell 
                        sx={{ cursor: "pointer" }} 
                        onClick={() => handleOpen(activity.name, activity)}
                      >
                        {time}
                      </TableCell>
                      <TableCell 
                        sx={{ cursor: "pointer" }} 
                        onClick={() => handleOpen(activity.name, activity)}
                      >
                        {activity.name}
                      </TableCell>
                      <TableCell 
                        sx={{ cursor: "pointer" }} 
                        onClick={() => handleOpen(activity.name, activity)}
                      >
                        {activity.notes?.replace(/poop/gi, "💩").replace(/pee/gi, "🚽") || "—"}
                      </TableCell>
                      <TableCell>
                        <Button color="error" size="small" onClick={() => deleteActivity(activity.id)}>
                          🚮
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default ActivityTable;