import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import type React from 'react';
import SearchBar from './searchbar';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  onSearch: (query: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  const navigate = useNavigate();

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
          height: '64px',
          px: '2.5rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 2,
        }}>
        <Typography
          onClick={() => navigate('/homepage/1')}
          variant='h6'
          sx={{ color: 'white', mr: 2, cursor: 'pointer' }}>
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
