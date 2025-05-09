import { useState, useEffect } from 'react';
import { animeService } from './services/apiService';
import type { Anime } from './types/anime';
import Cards from './components/card';
import './App.css';

function App() {
  const [anime, setAnime] = useState<Anime[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testFetchAllAnime = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch the full list of anime using getAnimeList
      const response = await animeService.getAnimeList(1, 25); // Fetch the first page with 25 items
      setAnime(response.data); // Set the state to the array of anime
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch anime details when the component mounts
  useEffect(() => {
    testFetchAllAnime();
  }, []);

  return (
    <div className='app'>
      <h1>Anime List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}

      <div className='anime-grid'>
        {anime && anime.map((item) => <Cards key={item.mal_id} image={item.images.jpg.image_url} title={item.title} />)}
      </div>
    </div>
  );
}

export default App;
