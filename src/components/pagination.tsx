import { Box, Pagination, Typography } from '@mui/material';
import type React from 'react';

interface PaginateProps {
  count: number;
  page: number;
  onPageChange: (e: React.ChangeEvent<unknown>, value: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Paginate: React.FC<PaginateProps> = ({ count, page, onPageChange, totalItems, itemsPerPage }) => {
  const start = (page - 1) * itemsPerPage + 1;
  const end = Math.min(page * itemsPerPage, totalItems);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: { xs: 0, sm: 3 } }}>
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        color='primary'
        variant='outlined'
        shape='rounded'
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white',
            borderColor: 'white',
          },
          '& .Mui-selected': {
            backgroundColor: 'white',
            color: 'black',
          },
        }}
      />
      <Typography variant='caption' sx={{ mt: 1, color: 'white' }}>
        {totalItems > 0 ? `${start}-${end} of ${totalItems}` : 'No items found'}
      </Typography>
    </Box>
  );
};

export default Paginate;
