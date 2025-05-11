import { useCallback, useEffect, useState } from 'react';
import { apiService } from './services/apiService';
import type { Anime, Daum } from './services/types/anime';
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
  const [animeDetails, setAnimeDetails] = useState<Anime | null>(null);
  const [characters, setCharacters] = useState<Daum[]>([]);

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
      setError('Failed to retrieve anime list, please refresh and try again!');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAnimeDetails = async (id: number) => {
    try {
      const response = await apiService.getAnimeDetails(id);
      setAnimeDetails(response.data);
      const charactersResponse = await apiService.getAnimeCharacters(id);
      setCharacters(charactersResponse.data);
    } catch {
      setError('Failed to retrieve anime details, please refresh and try again!');
    }
  };

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
        setError('Failed to retrieve search results, please try to search again!');
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

    if (location.pathname.startsWith('/anime/')) {
      const id = parseInt(pathParts[pathParts.length - 1], 10);
      fetchAnimeDetails(id);
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
    animeDetails,
    characters,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#1F2937' }}>
      <Box sx={{ height: { xs: '120px', sm: '64px' } }}>
        <TopBar onSearch={handleSearch} />
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          height: { xs: 'calc(100vh - 120px)', sm: 'calc(100vh - 64px)' },
          overflowY: 'auto',
          width: '100%',
          px: { xs: 0, sm: 0 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          mb: { xs: 9, sm: 0 },
        }}>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant='h6' color='error'>
              {error}
            </Typography>
          </Box>
        ) : (
          <AppRoutes animeData={animeData} />
        )}
      </Box>
    </Box>
  );
}

export default App;
