import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/homepage';
import type { Anime, Daum } from '../services/types/anime';
import AnimeDetails from '../pages/animeDetails';

interface AppRoutesProps {
  animeData: {
    anime: Anime[] | null;
    totalPages: number;
    currentPage: number;
    totalItems: number;
    animeDetails: Anime | null;
    characters: Daum[];
  };
}

const AppRoutes = ({ animeData }: AppRoutesProps) => {
  const { anime, totalPages, currentPage, totalItems, animeDetails, characters } = animeData;

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/homepage/1' replace />} />
      <Route
        path='/homepage/:page'
        element={<HomePage anime={anime} totalPages={totalPages} currentPage={currentPage} totalItems={totalItems} />}
      />
      <Route path='/anime/:id' element={<AnimeDetails anime={animeDetails} characters={characters} />} />
      <Route path='*' element={<Navigate to='/homepage/1' replace />} />
    </Routes>
  );
};

export default AppRoutes;
