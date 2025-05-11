import type React from 'react';
import { useEffect, useState } from 'react';
import { InputAdornment, TextField, CircularProgress, MenuItem, Box, ClickAwayListener, Paper, Popper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Clear } from '@mui/icons-material';
import { apiService } from '../services/apiService';
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
  const [suggestions, setSuggestions] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [noResults, setNoResults] = useState(false);

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
        .searchAnime({ q: debouncedQuery, limit: 15 })
        .then((response) => {
          if (response.data.length === 0) {
            setNoResults(true);
            setSuggestions([]);
          } else {
            setNoResults(false);
            setSuggestions(response.data.map((item) => ({ id: item.mal_id, title: item.title })));
          }
          const input = document.getElementById('search-input');
          if (input) setAnchorEl(input);
        })
        .catch(() => {
          setSuggestions([]);
          setNoResults(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSuggestions([]);
      setNoResults(false);
      setAnchorEl(null);
    }
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setAnchorEl(null);
    navigate('/homepage/1');
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/homepage/1?keyword=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
      setAnchorEl(null);
    }
  };

  const handleSuggestionClick = (suggestion: { id: number; title: string }) => {
    setQuery('');
    navigate(`/anime/${suggestion.id}`);
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
        autoComplete='off'
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
            '&.Mui-focused fieldset': { borderColor: 'transparent' },
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
        open={Boolean(anchorEl) && (suggestions.length > 0 || noResults)}
        anchorEl={anchorEl}
        placement='bottom-start'
        sx={{ zIndex: 1100 }}
        modifiers={[{ name: 'offset', options: { offset: [-40, 8] } }]}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Paper
            elevation={3}
            sx={{
              maxHeight: '250px',
              overflowY: 'auto',
              width: { xs: '18.75rem', sm: '35rem' },
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}>
            <Box>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                  <CircularProgress size={24} />
                </Box>
              ) : noResults ? (
                <Typography variant='body2' sx={{ p: 2, textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                  No search results found
                </Typography>
              ) : (
                suggestions.map((suggestion, index) => (
                  <MenuItem key={index} onClick={() => handleSuggestionClick(suggestion)} sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                    {suggestion.title}
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
