import type React from 'react';
import type { Anime } from '../services/types/anime';
import { Box, Grid, Typography } from '@mui/material';
import Cards from '../components/card';
import Paginate from '../components/pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface HomePageProps {
  anime: Anime[] | null;
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

const HomePage: React.FC<HomePageProps> = ({ anime, totalPages, currentPage, totalItems }) => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/anime/${id}`); // Navigate to AnimeDetails page
  };

  return (
    <Box sx={{ py: 2, px: { xs: 0, sm: '18rem'} }}>
      <Typography variant='h5' sx={{ mb: 2, textAlign: 'center', color: 'white' }}>
        {keyword ? `Search results for "${keyword}"` : ''}
      </Typography>

      <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 12 }} spacing={2} justifyContent='center'>
        {anime && anime.length > 0 ? (
          anime.map((item, index) => (
            <Grid key={index} sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 4', lg: 'span 3' } }}>
              <Cards
                image={item.images.jpg.image_url}
                title={item.title}
                onClick={() => handleCardClick(item.mal_id)}
              />
            </Grid>
          ))
        ) : (
          <Grid columns={{ xs: 12 }}>
            <Typography variant='body1' align='center' sx={{ color: 'white' }}>
              {keyword ? 'No search results found' : 'No anime found'}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Paginate
        count={totalPages}
        page={currentPage}
        onPageChange={(e, value) => {
          // Keep search keyword in URL if present when changing pages
          if (keyword) {
            navigate(`/homepage/${value}?keyword=${encodeURIComponent(keyword)}`);
          } else {
            navigate(`/homepage/${value}`);
          }
        }}
        totalItems={totalItems}
        itemsPerPage={25}
      />
    </Box>
  );
};

export default HomePage;
