import type React from 'react';
import type { Anime } from '../services/types/anime';
import { Box, Grid } from '@mui/material';
import Cards from '../components/card';
import Paginate from '../components/pagination';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

interface HomePageProps {
  anime: Anime[] | null;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

const HomePage: React.FC<HomePageProps> = ({ anime, totalPages, currentPage, onPageChange, totalItems }) => {
  const { page } = useParams<{ page: string }>();

  useEffect(() => {
    if (page) {
      onPageChange(Number(page));
    } else {
      onPageChange(1);
    }
  }, [page, onPageChange]);

  return (
    <Box sx={{ py: 2, px: '18rem' }}>
      <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 12 }} spacing={2} justifyContent='center'>
        {anime?.map((item) => (
          <Grid sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 4', lg: 'span 3' } }}>
            <Cards image={item.images.jpg.image_url} title={item.title} />
          </Grid>
        ))}
      </Grid>
      <Paginate
        count={totalPages}
        page={currentPage}
        onPageChange={(e, value) => {
          onPageChange(value);
          window.history.pushState(null, '', `/homepage/${value}`);
        }}
        totalItems={totalItems}
        itemsPerPage={25}
      />
    </Box>
  );
};

export default HomePage;
