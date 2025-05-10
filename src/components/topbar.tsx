import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import type React from 'react';
import SearchBar from './searchbar';

interface TopBarProps {
  onSearch: (query: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 0,
        width: '100%',
      }}>
      <Toolbar
        sx={{
          height: '64px', // Using pixel value for consistency (4rem)
          px: '2.5rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 2,
        }}>
        <Typography variant='h6' sx={{ color: 'black', mr: 2 }}>
          Anime Search App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchBar onSearch={onSearch}></SearchBar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
