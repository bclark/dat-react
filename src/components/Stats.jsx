import { Stack, Typography, IconButton, Collapse } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { calculateStatsWithTrend, getTrendIcon, getWalkTrendIcon } from "../utils/statsCalculator";
import PropTypes from 'prop-types';

const Stats = ({ activities, expanded, onToggle }) => {
  const currentStats = calculateStatsWithTrend(activities, 0);
  const historicalStats = calculateStatsWithTrend(activities, 2);

  return (
    <Stack spacing={2}>
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
        sx={{ pb: expanded ? 0 : 1 }}
      >
        <Typography variant="h6">Statistics</Typography>
        <IconButton onClick={onToggle}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Stack>
      
      <Collapse in={expanded} sx={{ mt: '0 !important' }}>
        <Stack spacing={2}>
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
            <AccessTimeIcon color="primary" />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Current: {currentStats.walkTimingResult}
              <br />
              Historical: {historicalStats.walkTimingResult} {getWalkTrendIcon(currentStats.walkTimingResult, historicalStats.walkTimingResult)}
            </Typography>
          </Stack>

          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
            <PetsIcon color="primary" />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Current: {currentStats.avgPoops.toFixed(1)} per day
              <br />
              Historical: {historicalStats.avgPoops.toFixed(1)} per day {getTrendIcon(currentStats.avgPoops, historicalStats.avgPoops)}
            </Typography>
          </Stack>

          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
            <WaterDropIcon color="primary" />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Current: {currentStats.avgPees.toFixed(1)} per day
              <br />
              Historical: {historicalStats.avgPees.toFixed(1)} per day {getTrendIcon(currentStats.avgPees, historicalStats.avgPees)}
            </Typography>
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
};

Stats.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    notes: PropTypes.string
  })).isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Stats; 