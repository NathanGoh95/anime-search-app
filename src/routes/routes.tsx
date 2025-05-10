import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/homepage';
import type { Anime } from '../services/types/anime';

interface AppRoutesProps {
  animeData: {
    anime: Anime[] | null;
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    totalItems: number;
  };
}

const AppRoutes = ({ animeData }: AppRoutesProps) => {
  const { anime, totalPages, currentPage, onPageChange, totalItems } = animeData;

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/homepage/1' replace />} />
      <Route
        path='/homepage/:page'
        element={
          <HomePage
            anime={anime}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalItems={totalItems}
          />
        }
      />
      {/* Add future routes here, for example:
      <Route path="/anime/:id" element={<AnimeDetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      */}
      <Route path='*' element={<Navigate to='/homepage/1' replace />} />
    </Routes>
  );
};

export default AppRoutes;
