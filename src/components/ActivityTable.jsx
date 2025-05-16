import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Box, Collapse, IconButton, Link } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiEmoticonPoop } from '@mdi/js';  

const ActivityTable = ({ activities, handleOpen }) => {
  const [expandedDates, setExpandedDates] = useState(() => {
    // Get all unique dates from activities
    const dates = new Set(activities.map(activity => 
      new Date(activity.created_at).toLocaleDateString()
    ));
    return dates;
  });

  // Track the most recently added activity
  const [lastAddedId, setLastAddedId] = useState(null);

  // Add new state for tracking clicks
  const [lastClick, setLastClick] = useState({ id: null, time: 0 });

  // Update lastAddedId when activities change
  useEffect(() => {
    if (activities.length > 0) {
      const mostRecent = activities[0]; // Assuming activities are sorted by date desc
      setLastAddedId(mostRecent.id);
      // Clear the highlight after animation
      setTimeout(() => setLastAddedId(null), 2000);
    }
  }, [activities]);

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
    console.log('Activities received in groupActivitiesByDate:', activities.length);
    const grouped = activities.reduce((groups, activity) => {
      const date = new Date(activity.created_at).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
      return groups;
    }, {});
    console.log('Grouped activities by date:', Object.keys(grouped).length, 'dates');
    return grouped;
  };

  const activitiesByDate = groupActivitiesByDate(activities);
  console.log('Final activitiesByDate:', Object.entries(activitiesByDate).map(([date, acts]) => `${date}: ${acts.length}`));
  const hasMoreActivities = activities.length > 30;

  const formatNotes = (notes) => {
    if (!notes) return "—";
    
    const parts = notes.split(/(poop|pee)/gi);
    return parts.map((part, index) => {
      if (part.toLowerCase() === 'pee') {
        return <WaterDropIcon key={index} sx={{ color: '#FFD700', fontSize: 24}} />;
      } else if (part.toLowerCase() === 'poop') {
        return <Icon key={index} path={mdiEmoticonPoop} color="brown" size='24px' />;
      }
      return part;
    });
  };

  const handleRowClick = (activity) => {
    const now = Date.now();
    
    // Check for double click/tap (within 300ms)
    if (lastClick.id === activity.id && now - lastClick.time < 300) {
      // Only handle double-tap for Walk activities
      if (activity.name === "Walk") {
        // Toggle poop in notes
        const hasPoopNow = activity.notes?.toLowerCase().includes('poop') || false;
        const updatedNotes = hasPoopNow 
          ? activity.notes.replace(/poop/gi, '').trim()
          : `${activity.notes ? activity.notes + ' poop' : 'poop'}`;
          
        // Open modal with updated notes
        handleOpen(activity.name, { ...activity, notes: updatedNotes });
      }
    } else {
      // Single click behavior
      handleOpen(activity.name, activity);
    }

    // Update last click
    setLastClick({ id: activity.id, time: now });
  };

  const formatDateHeader = (date) => {
    const [month, day] = date.split('/');
    const isBirthday = month === '5' && day === '3';
    return (
      <>
        {date}
        {isBirthday && ' 🎂🎉'}
      </>
    );
  };

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
              {formatDateHeader(date)}
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activitiesForDate.map((activity) => {
                    const time = new Date(activity.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <TableRow 
                        key={activity.id} 
                        hover
                        sx={{
                          cursor: "pointer",
                          ...(activity.id === lastAddedId && {
                            animation: 'highlightFade 2s',
                            '@keyframes highlightFade': {
                              '0%': { backgroundColor: 'rgba(183, 225, 205, 0.4)' },
                              '100%': { backgroundColor: 'transparent' }
                            }
                          })
                        }}
                        onClick={() => handleRowClick(activity)}
                      >
                        <TableCell>{time}</TableCell>
                        <TableCell>{activity.name}</TableCell>
                        <TableCell>{formatNotes(activity.notes)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </Paper>
      ))}
      
      {hasMoreActivities && (
        <Box sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
          <Link
            href="/?count=0"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            View All {activities.length} Activities →
          </Link>
        </Box>
      )}
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