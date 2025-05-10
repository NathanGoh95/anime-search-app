import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import type React from 'react';
import SearchBar from './searchbar';

interface TopBarProps {
  onSearch: (query: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  return (
    <AppBar position='fixed' sx={{ backgroundColor: 'transparent', }}>
      <Toolbar
        sx={{
          height: '64px',
          px: '40px',
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
