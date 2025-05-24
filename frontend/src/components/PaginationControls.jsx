import React from 'react';
import { Box } from '@mui/material';
import Button from './UIButton';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    const maroon = '#7B1113';

    if (totalPages <= 1) return null;

    return (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;

            return (
            <Button
                key={page}
                onClick={() => onPageChange(page)}
                variant="outlined" // base variant, overridden by sx
                sx={{
                mx: 0.5,
                width: 40,
                height: 40,
                minWidth: 40,
                borderRadius: '50%',
                border: `2px solid ${isActive ? '#fff' : maroon}`,
                backgroundColor: isActive ? maroon : '#fff',
                color: isActive ? '#fff' : maroon,
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    backgroundColor: isActive ? '#5c0d0e' : '#f5f5f5',
                },
                }}
            >
                {page}
            </Button>
            );
        })}
        </Box>
    );
};

export default PaginationControls;
