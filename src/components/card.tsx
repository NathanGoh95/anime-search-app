import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface CardsProps {
  image: string;
  title: string;
  onClick: () => void;
}

const Cards: React.FC<CardsProps> = ({ image, title, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        position: 'relative',
        boxShadow: 0,
        borderRadius: 0,
        width: '225px',
      }}>
      <CardMedia
        component='img'
        image={image}
        alt={title}
        sx={{
          height: '325px',
          objectFit: 'cover',
          borderRadius: '0.5rem',
        }}
      />
      <CardContent>
        <Typography variant='subtitle2' component='div' sx={{ height: '25px', textAlign: 'center', color: 'white' }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Cards;
