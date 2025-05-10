import { useCallback, useEffect, useState } from 'react';
import { apiService } from './services/apiService';
import type { Anime } from './types/anime';
import Cards from './components/card';
import './App.css';
import TopBar from './components/topbar';

function App() {
  const [anime, setAnime] = useState<Anime[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimeList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getAnimeList(1, 25);
      setAnime(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimeList();
  }, [fetchAnimeList]);

  const handleSearch = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (trimmed.length === 0) {
        fetchAnimeList(); // Reset to default list
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await apiService.searchAnime({ q: trimmed, limit: 5 });
        setAnime(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [fetchAnimeList],
  );

  return (
    <div className='app'>
      <TopBar onSearch={handleSearch} />
      {/* {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>} */}
      {/* <div className='anime-grid'>
        {anime?.map((item) => (
          <Cards key={item.mal_id} image={item.images.jpg.image_url} title={item.title} />
        ))}
      </div> */}
    </div>
  );
}

export default App;
