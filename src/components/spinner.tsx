import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#e01cd5' />
            <stop offset='100%' stopColor='#1CB5E0' />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress size='4rem' sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </Box>
  );
};

export default Spinner;
