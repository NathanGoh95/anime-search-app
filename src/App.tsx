import { useCallback, useEffect, useState } from 'react';
import { apiService } from './services/apiService';
import type { Anime } from './services/types/anime';
import './App.css';
import TopBar from './components/topbar';
import { Box, Typography } from '@mui/material';
import Spinner from './components/spinner';
import AppRoutes from './routes/routes';
import { useSearchParams, useLocation } from 'react-router-dom';

function App() {
  const [anime, setAnime] = useState<Anime[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const fetchAnimeList = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getAnimeList(page, 25);
      setAnime(response.data);
      setTotalPages(response.pagination.last_visible_page);
      setTotalItems(response.pagination.items.total || 0);
      setCurrentPage(page);
    } catch {
      setError('Unable to retrieve anime list');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchAnime = useCallback(
    async (query: string, page: number = 1) => {
      if (!query.trim()) {
        fetchAnimeList(page);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await apiService.searchAnime({
          q: query,
          limit: 25,
          page,
        });
        setAnime(response.data);
        setTotalPages(response.pagination.last_visible_page);
        setTotalItems(response.pagination.items.total || 0);
        setCurrentPage(page);
      } catch {
        setError('Unable to retrieve search results');
      } finally {
        setLoading(false);
      }
    },
    [fetchAnimeList],
  );

  useEffect(() => {
    const keyword = searchParams.get('keyword');
    const pathParts = location.pathname.split('/');
    const urlPage = parseInt(pathParts[pathParts.length - 1] || '1', 10);

    if (keyword) {
      searchAnime(keyword, urlPage);
    } else {
      fetchAnimeList(urlPage);
    }
  }, [location.pathname, searchParams, fetchAnimeList, searchAnime]);

  const handleSearch = useCallback(
    (query: string) => {
      searchAnime(query, 1);
    },
    [searchAnime],
  );

  const animeData = {
    anime,
    totalPages,
    currentPage,
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
