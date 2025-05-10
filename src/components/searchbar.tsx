import type React from 'react';
import { useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Clear } from '@mui/icons-material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
  };

  return (
    <TextField
      placeholder='Search Anime'
      variant='outlined'
      fullWidth
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{
        backgroundColor: '#F4F5F7',
        height: '2.5rem',
        borderRadius: '50px',
        width: '18.75rem',
        fontSize: '0.85rem',
        '& .MuiOutlinedInput-root': {
          height: '100%',
          borderRadius: '50px',
          paddingRight: '0.75rem',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1A76D2',
          },
        },
        '& .MuiInputBase-input': {
          padding: 0,
          paddingLeft: '1rem',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          lineHeight: '2.5rem',
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
          endAdornment: (
            <InputAdornment position='end'>
              {query ? (
                <Clear
                  onClick={handleClear}
                  sx={{
                    color: '#474747',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#1A76D2',
                    },
                  }}
                />
              ) : (
                <SearchIcon sx={{ color: '#474747', fontSize: '1.25rem' }} />
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
