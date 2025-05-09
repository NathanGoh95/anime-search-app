import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface CardsProps {
  image: string;
  title: string;
}

const Cards: React.FC<CardsProps> = ({ image, title }) => {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '8px',
        position: 'relative',
      }}>
      <CardMedia component='img' image={image} alt={title} />
      <CardContent>
        <Typography variant='h6' component='div'>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Cards;
