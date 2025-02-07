import { Table, TableHead, TableBody, TableRow, TableCell, Button, Paper, Typography, Box, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ActivityTable = ({ activities, handleOpen, deleteActivity }) => {
  const [expandedDates, setExpandedDates] = useState(() => {
    const today = new Date().toLocaleDateString();
    return new Set([today]);
  });

  const toggleDate = (date) => {
    const newExpandedDates = new Set(expandedDates);
    if (newExpandedDates.has(date)) {
      newExpandedDates.delete(date);
    } else {
      newExpandedDates.add(date);
    }
    setExpandedDates(newExpandedDates);
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

  const activitiesByDate = groupActivitiesByDate(activities);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {Object.entries(activitiesByDate).map(([date, activitiesForDate]) => (
        <Paper 
          key={date} 
          elevation={3} 
          sx={{ 
            width: "100%",
            mb: 3,
            overflowX: "auto"
          }}
        >
          {/* Date Header */}
          <Box 
            sx={{ 
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => toggleDate(date)}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {date}
            </Typography>
            <IconButton size="small">
              {expandedDates.has(date) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          {/* Table */}
          <Collapse in={expandedDates.has(date)}>
            <Box sx={{ p: 2, pt: 0 }}>
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
            </Box>
          </Collapse>
        </Paper>
      ))}
    </Box>
  );
};

ActivityTable.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    notes: PropTypes.string
  })).isRequired,
  handleOpen: PropTypes.func.isRequired,
  deleteActivity: PropTypes.func.isRequired
};

export default ActivityTable;