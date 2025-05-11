import type React from 'react';
import { useEffect, useState } from 'react';
import {
  InputAdornment,
  TextField,
  CircularProgress,
  MenuItem,
  Box,
  ClickAwayListener,
  Paper,
  Popper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Clear } from '@mui/icons-material';
import { apiService } from '../services/apiService'; // Import your API service
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('keyword') || '';

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      apiService
        .searchAnime({ q: debouncedQuery, limit: 5 })
        .then((response) => {
          setSuggestions(response.data.map((item) => item.title));
          const input = document.getElementById('search-input');
          if (input) setAnchorEl(input);
        })
        .catch(() => {
          setSuggestions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSuggestions([]);
      setAnchorEl(null);
    }
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setAnchorEl(null);
    // Navigate back to homepage when search is cleared
    navigate('/homepage/1');
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Update URL with search parameters
      navigate(`/homepage/1?keyword=${encodeURIComponent(query.trim())}`);

      // Close suggestions
      setSuggestions([]);
      setAnchorEl(null);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    // Use setTimeout to allow state update before search
    setTimeout(() => {
      // onSearch(suggestion);
      navigate(`/homepage/1?keyword=${encodeURIComponent(suggestion)}`);
      setAnchorEl(null);
    }, 0);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const input = document.getElementById('search-input');
    const popover = document.querySelector('.MuiPopover-paper');

    if (input && !input.contains(event.target as Node) && popover && !popover.contains(event.target as Node)) {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl]);

  // Initialize query from URL when component mounts
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  return (
    <Box>
      <TextField
        id='search-input'
        placeholder='Search Anime'
        variant='outlined'
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          backgroundColor: '#F4F5F7',
          height: '2.5rem',
          borderRadius: '50px',
          width: '18.75rem',
          fontSize: '0.85rem',
          lineHeight: '0.85rem',
          '& .MuiOutlinedInput-root': {
            height: '100%',
            borderRadius: '50px',
            paddingRight: '0.75rem',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: 'transparent' },
            '&.Mui-focused fieldset': { borderColor: '#1A76D2' },
          },
          '& .MuiInputBase-input': {
            padding: 0,
            paddingLeft: '1rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '0.85rem',
            color: 'black',
            fontSize: '0.85rem',
            '&::placeholder': {
              color: '#474747',
              opacity: 1,
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon
                  sx={{
                    color: '#474747',
                    fontSize: '1.25rem',
                    cursor: query ? 'pointer' : 'default',
                    '&:hover': query ? { color: '#1A76D2' } : {},
                  }}
                  onClick={handleSearch}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                {query ? (
                  <Clear
                    onClick={handleClear}
                    sx={{
                      color: '#474747',
                      fontSize: '1.25rem',
                      cursor: 'pointer',
                      '&:hover': { color: '#1A76D2' },
                    }}
                  />
                ) : null}
              </InputAdornment>
            ),
          },
        }}
      />

      <Popper
        open={Boolean(anchorEl) && suggestions.length > 0}
        anchorEl={anchorEl}
        placement='bottom-start'
        sx={{ zIndex: 1100 }}
        modifiers={[{ name: 'offset', options: { offset: [-40, 8] } }]}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Paper
            elevation={3}
            sx={{
              maxHeight: '200px',
              overflowY: 'auto',
              width: '30rem',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}>
            <Box padding='10px'>
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                suggestions.map((suggestion, index) => (
                  <MenuItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </MenuItem>
                ))
              )}
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default SearchBar;
