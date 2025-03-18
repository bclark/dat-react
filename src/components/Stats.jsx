import { Stack, Typography, IconButton, Collapse } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Icon from '@mdi/react';
import { mdiEmoticonPoop } from '@mdi/js';
import { calculateStatsWithTrend, getTrendIcon, getWalkTrendIcon } from "../utils/statsCalculator";
import PropTypes from 'prop-types';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Stats = ({ activities, expanded, onToggle }) => {
  const currentStats = calculateStatsWithTrend(activities, 0);
  const historicalStats = calculateStatsWithTrend(activities, 2);

  const renderTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon sx={{ color: 'success.main' }} />;
      case 'down':
        return <TrendingDownIcon sx={{ color: 'error.main' }} />;
      default:
        return <TrendingFlatIcon sx={{ color: 'text.secondary' }} />;
    }
  };

  return (
    <Stack 
      spacing={2} 
      sx={{ 
        '& .MuiTypography-body1': {
          color: '#00FF00', // Neon green text
          textShadow: '1px 1px #000000'
        },
        '& .MuiSvgIcon-root': {
          filter: 'drop-shadow(0 0 2px #00FFFF)'
        }
      }}
    >
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
            <PetsIcon color="primary" />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Current: {currentStats.avgWalksPerDay.toFixed(1)} walks per day
              <br />
              Historical: {historicalStats.avgWalksPerDay.toFixed(1)} walks per day {renderTrendIcon(getTrendIcon(currentStats.avgWalksPerDay, historicalStats.avgWalksPerDay))}
            </Typography>
          </Stack>

          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
            <PetsIcon color="primary" />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Current: {currentStats.walkTimingResult}
              <br />
              Historical: {historicalStats.walkTimingResult} {renderTrendIcon(getWalkTrendIcon(currentStats.walkTimingResult, historicalStats.walkTimingResult))}
            </Typography>
          </Stack>

          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
            <Icon path={mdiEmoticonPoop} color="#1976d2" size={1} />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Current: {currentStats.avgPoops.toFixed(1)} per day
              <br />
              Historical: {historicalStats.avgPoops.toFixed(1)} per day {renderTrendIcon(getTrendIcon(currentStats.avgPoops, historicalStats.avgPoops))}
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
              Historical: {historicalStats.avgPees.toFixed(1)} per day {renderTrendIcon(getTrendIcon(currentStats.avgPees, historicalStats.avgPees))}
            </Typography>
          </Stack>

          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
            <RestaurantIcon color="primary" />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Morning Meal: {currentStats.morningMealTime}
            </Typography>
          </Stack>

          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
            <RestaurantIcon color="primary" />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Evening Meal: {currentStats.eveningMealTime}
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