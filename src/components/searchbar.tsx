import type React from 'react';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

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

  return (
    <TextField
      label='Search Anime'
      variant='outlined'
      fullWidth
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{ mb: '16px' }}
    />
  );
};

export default SearchBar;
