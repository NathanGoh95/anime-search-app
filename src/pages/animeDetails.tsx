import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Paper, Divider, Container } from '@mui/material';
import type { Anime, Daum } from '../services/types/anime';

interface AnimeDetailsProps {
  anime: Anime | null;
  characters: Daum[];
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({ anime, characters }) => {
  const navigate = useNavigate();
  const [showAllCharacters, setShowAllCharacters] = useState(false);

  // Function to handle showing more characters
  const handleShowMore = () => {
    setShowAllCharacters(true);
  };

  // Function to collapse character list
  const handleCollapse = () => {
    setShowAllCharacters(false);
  };

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1); // Navigate back
  };

  return (
    <Container maxWidth='lg' sx={{ py: 2 }}>
      {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 2 }}>
        <Button
          variant='text'
          onClick={handleBack}
          sx={{
            backgroundColor: '#222', // Current background color
            color: 'white',
            '&:hover': {
              backgroundColor: '#333', // Slightly lighter color on hover
            },
          }}>
          BACK
        </Button>
      </Box>

      {/* Anime Title Header */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: '#222',
          color: 'white',
          py: 2,
          px: 3,
          mb: 2,
          borderRadius: 1,
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'flex-start' },
        }}>
        <Typography variant='h5' fontWeight='bold'>
          {anime?.title}
        </Typography>
      </Paper>

      {/* Image, Alternative Titles & Information Section */}
      <Paper
        elevation={0}
        sx={{
          mb: 2,
          backgroundColor: '#222',
          p: 2,
          width: 'lg',
        }}>
        <Grid container spacing={2}>
          {/* Left Column - Anime Image */}
          {/* <Grid sx={{ width: '25%' }}> */}
          <Grid
            columns={{ xs: 12, sm: 3 }}
            sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center' }}>
            <Box sx={{ minWidth: 120, width: '100%', maxWidth: 200 }}>
              {/* Anime Image */}
              <Box sx={{ flex: 1, minWidth: 120 }}>
                <CardMedia
                  component='img'
                  image={anime?.images?.jpg?.image_url}
                  alt={anime?.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Alternative Titles & Information */}
          <Grid sx={{ width: { xs: '100%', sm: '72%' } }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1, color: 'white' }}>
                Alternative Titles
              </Typography>
              <Divider sx={{ mb: 1, backgroundColor: '#444' }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box display={'flex'} gap={1} mb={1}>
                  <Grid columns={{ xs: 4 }} sx={{ color: '#aaa' }}>
                    <Typography variant='body2'>Synonyms:</Typography>
                  </Grid>
                  <Grid columns={{ xs: 8 }} sx={{ color: 'white' }}>
                    <Typography variant='body2'>{anime?.title_synonyms?.join(', ')}</Typography>
                  </Grid>
                </Box>
                <Box display={'flex'} gap={1} mb={1}>
                  <Grid columns={{ xs: 4 }} sx={{ color: '#aaa' }}>
                    <Typography variant='body2'>Japanese:</Typography>
                  </Grid>
                  <Grid columns={{ xs: 8 }} sx={{ color: 'white' }}>
                    <Typography variant='body2'>{anime?.title_japanese}</Typography>
                  </Grid>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1, color: 'white' }}>
                Information
              </Typography>
              <Divider sx={{ mb: 1, backgroundColor: '#444' }} />
              <Grid container spacing={1}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box display={'flex'} gap={1} mb={1}>
                    <Grid columns={{ xs: 4 }} sx={{ color: '#aaa' }}>
                      <Typography variant='body2'>Type:</Typography>
                    </Grid>
                    <Grid columns={{ xs: 8 }} sx={{ color: 'white' }}>
                      <Typography variant='body2'>{anime?.type}</Typography>
                    </Grid>
                  </Box>

                  <Box display={'flex'} gap={1} mb={1}>
                    <Grid columns={{ xs: 4 }} sx={{ color: '#aaa' }}>
                      <Typography variant='body2'>Episodes:</Typography>
                    </Grid>
                    <Grid columns={{ xs: 8 }} sx={{ color: 'white' }}>
                      <Typography variant='body2'>{anime?.episodes}</Typography>
                    </Grid>
                  </Box>

                  <Box display={'flex'} gap={1} mb={1}>
                    <Grid columns={{ xs: 4 }} sx={{ color: '#aaa' }}>
                      <Typography variant='body2'>Status:</Typography>
                    </Grid>
                    <Grid columns={{ xs: 8 }} sx={{ color: 'white' }}>
                      <Typography variant='body2'>{anime?.status}</Typography>
                    </Grid>
                  </Box>

                  <Box display={'flex'} gap={1} mb={1}>
                    <Grid columns={{ xs: 4 }} sx={{ color: '#aaa' }}>
                      <Typography variant='body2'>Aired:</Typography>
                    </Grid>
                    <Grid columns={{ xs: 8 }} sx={{ color: 'white' }}>
                      <Typography variant='body2'>{anime?.aired?.string}</Typography>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {/* Synopsis & Score Section */}
        <Grid columns={{ xs: 12, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4, // Increased padding for better spacing
              mb: 2,
              backgroundColor: '#222',
            }}>
            <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1, color: 'white' }}>
              Synopsis
            </Typography>
            <Divider sx={{ mb: 3, backgroundColor: '#444' }} />

            <Typography variant='body2' sx={{ color: '#ddd', mb: 4, lineHeight: 1.6 }} textAlign={'justify'}>
              {anime?.synopsis ||
                'The city of Tokyo is plagued by a deadly phenomenon: spontaneous human combustion! Luckily, a special team is there to quench the inferno: The Fire Force! The third season continues to follow Shinra Kusakabe, a third generation pyrokinetic youth who gained the nickname "Devil\'s Footprints" for his ability to ignite his feet at will.'}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: 3,
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
              }}>
              <Box sx={{ mr: 6 }}>
                <Typography variant='body2' sx={{ color: '#aaa', mb: 1 }}>
                  Score
                </Typography>
                <Typography variant='h4' sx={{ color: 'white', fontWeight: 'bold' }}>
                  {anime?.score}
                </Typography>
              </Box>

              <Box sx={{ mr: 6 }}>
                <Typography variant='body2' sx={{ color: '#aaa', mb: 1 }}>
                  Ranked
                </Typography>
                <Typography variant='h4' sx={{ color: 'white' }}>
                  #{anime?.rank}
                </Typography>
              </Box>

              <Box>
                <Typography variant='body2' sx={{ color: '#aaa', mb: 1 }}>
                  Year
                </Typography>
                <Typography variant='h4' sx={{ color: 'white' }}>
                  {anime?.year}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Characters Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4, // Increased padding
              backgroundColor: '#222',
              mb: { xs: 4, sm: 2 },
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1, color: 'white' }}>
                Characters
              </Typography>
              <Typography
                onClick={showAllCharacters ? handleCollapse : handleShowMore}
                sx={{
                  cursor: 'pointer',
                  width: '100px',
                  color: '#4a90e2', // Lighter blue color
                  '&:hover': { backgroundColor: 'transparent' },
                  fontWeight: 'bold',
                }}>
                {showAllCharacters ? 'VIEW LESS' : 'VIEW MORE'}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, backgroundColor: '#444' }} />

            <Grid container spacing={3}>
              {(showAllCharacters ? characters : characters.slice(0, 10)).map((character, index) => (
                <Grid columns={{ xs: 12, sm: 6, md: 6 }} key={character.character?.mal_id || index}>
                  <Card
                    elevation={0}
                    sx={{
                      display: 'flex',
                      backgroundColor: '#2b2b2b',
                      border: '1px solid #333',
                      height: 96,
                      borderRadius: 1,
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: '0 0 0 1px #444',
                      },
                    }}>
                    <CardMedia
                      component='img'
                      image={character.character?.images?.jpg?.image_url}
                      alt={character.character?.name}
                      sx={{ width: 70, height: 96, objectFit: 'cover' }}
                    />
                    <CardContent
                      sx={{
                        flex: 1,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '427px',
                      }}>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'white',
                          fontWeight: 'bold',
                          mb: 0.5,
                        }}>
                        {character.character?.name}
                      </Typography>
                      <Typography variant='body2' sx={{ color: '#aaa', fontSize: '0.8rem' }}>
                        {character.role}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnimeDetails;
