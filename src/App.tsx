import { useState, useEffect } from 'react';
import { animeService } from './services/apiService';
import type { Anime } from './types/anime';
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
      const response = await animeService.getAnimeList(1, 20); // Fetch the first page with 20 items
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

      {anime &&
        anime.map((item) => (
          <div key={item.mal_id} className='anime-card'>
            <h2>{item.title}</h2>
            <img src={item.images.jpg.image_url} alt={item.title} />
            <p>
              <strong>Score:</strong> {item.score}
            </p>
            <p>
              <strong>Episodes:</strong> {item.episodes}
            </p>
            <p>
              <strong>Status:</strong> {item.status}
            </p>
            <p>
              <strong>Synopsis:</strong> {item.synopsis}
            </p>
          </div>
        ))}
    </div>
  );
}

export default App;
