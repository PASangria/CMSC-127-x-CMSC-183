import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function StatCard({ title, value, interval, trend }) {
    const theme = useTheme();

    const trendColors = {
        up: theme.palette.success.main,
        down: theme.palette.error.main,
        neutral: theme.palette.grey[400],
    };

    const labelColors = {
        up: 'success',
        down: 'error',
        neutral: 'default',
    };

    const trendValues = {
        up: '+25%',
        down: '-25%',
        neutral: '+5%',
    };

    const color = labelColors[trend];

    return (
        <Card
        variant="outlined"
        sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 2, sm: 4 },
            justifyContent: 'center',
        }}
        >
        <CardContent
            sx={{
            flexGrow: 1,
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            }}
        >
            <Typography component="h2" variant="subtitle1" fontWeight="bold" gutterBottom>
            {title}
            </Typography>

            <Stack spacing={2} justifyContent="center">
            <Box sx={{ flexGrow: 1, height: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" fontWeight="bold">{value}</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {interval}
                </Typography>
            </Box>
            </Stack>
        </CardContent>
        </Card>
    );
}

StatCard.propTypes = {
    interval: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trend: PropTypes.oneOf(['down', 'neutral', 'up']).isRequired,
    value: PropTypes.string.isRequired,
};

export default StatCard;
