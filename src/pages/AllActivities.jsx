import { Box, Container, Typography } from '@mui/material';
import ActivityTable from '../components/ActivityTable';
import { useActivities } from '../hooks/useActivities'; // You'll need to create this hook

const AllActivities = () => {
  const { activities, handleOpen } = useActivities();

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        All Activities
      </Typography>
      <ActivityTable 
        activities={activities} 
        handleOpen={handleOpen}
        showAll={true} // New prop to indicate we want to show all activities
      />
    </Container>
  );
};

export default AllActivities; 