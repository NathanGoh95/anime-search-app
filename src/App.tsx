import { useCallback, useEffect, useState } from 'react';
import { apiService } from './services/apiService';
import type { Anime } from './services/types/anime';
import './App.css';
import TopBar from './components/topbar';
import { Box, Typography } from '@mui/material';
import HomePage from './pages/homepage';
import Spinner from './components/spinner';
import AppRoutes from './routes/routes';

function App() {
  const [anime, setAnime] = useState<Anime[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchAnimeList = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getAnimeList(page, 25);
      setAnime(response.data);
      setTotalPages(response.pagination.last_visible_page);
      setTotalItems(response.pagination.items.total || 0);
    } catch {
      setError('Unable to retrieve anime list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimeList(currentPage);
  }, [fetchAnimeList, currentPage]);

  const handleSearch = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (trimmed.length === 0) {
        fetchAnimeList(currentPage);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await apiService.searchAnime({ q: trimmed, limit: 25 });
        setAnime(response.data);
        setTotalPages(1);
        setTotalItems(response.data.length);
      } catch {
        setError('Unable to retrieve search results');
      } finally {
        setLoading(false);
      }
    },
    [fetchAnimeList, currentPage],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const animeData = {
    anime,
    totalPages,
    currentPage,
    onPageChange: handlePageChange,
    totalItems,
    loading,
    error,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ height: '64px' }}>
        <TopBar onSearch={handleSearch} />
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          width: '100%',
        }}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Typography color='error' variant='h6' align='center' sx={{ mt: 4 }}>
              {error}
            </Typography>
            <AppRoutes animeData={animeData} />
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
