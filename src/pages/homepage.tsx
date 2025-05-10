import type React from 'react';
import type { Anime } from '../services/types/anime';
import { Box, Grid } from '@mui/material';
import Cards from '../components/card';
import Paginate from '../components/pagination';

interface HomePageProps {
  anime: Anime[] | null;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

const HomePage: React.FC<HomePageProps> = ({ anime, totalPages, currentPage, onPageChange, totalItems }) => {
  return (
    <Box sx={{ py: 2, px: '18rem' }}>
      <Grid container spacing={2} justifyContent='center'>
        {anime?.map((item) => (
          <Grid
            item
            key={item.mal_id}
            xs={12}
            sm={6}
            md={4}
            lg={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Cards image={item.images.jpg.image_url} title={item.title} />
          </Grid>
        ))}
      </Grid>
      <Paginate
        count={totalPages}
        page={currentPage}
        onPageChange={(event, value) => onPageChange(value)}
        totalItems={totalItems}
        itemsPerPage={25}
      />
    </Box>
  );
};

export default HomePage;
