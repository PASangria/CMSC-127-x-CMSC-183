import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { areaElementClasses } from '@mui/x-charts/LineChart';

// Utility: Get days in the current month from day 1 to today
function getCurrentMonthLabels() {
    const now = new Date();
    const today = now.getDate();
    const monthName = now.toLocaleDateString('en-US', { month: 'short' });

    const days = [];
    for (let i = 1; i <= today; i++) {
        days.push(`${monthName} ${i}`);
    }

    return days;
}

function AreaGradient({ color, id }) {
    return (
        <defs>
        <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
        </defs>
    );
}

AreaGradient.propTypes = {
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

function StatCard({ title, value, interval, trend, data }) {
    const theme = useTheme();
    const currentLabels = getCurrentMonthLabels();

    // Pad data with 0 if missing
    const paddedData = currentLabels.map((_, i) => data[i] ?? 0);

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
    const chartColor = trendColors[trend];
    const gradientId = `area-gradient-${title.replace(/\s+/g, '-')}`;

    return (
        <Card
            variant="outlined"
            sx={{
                width: '424px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 2, sm: 4 },
                justifyContent: 'space-between',
            }}
        >
            <CardContent sx={{ flexGrow: 1, p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography component="h2" variant="subtitle1" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>

                <Stack spacing={2} flexGrow={1} justifyContent="space-between">
                    <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4" fontWeight="bold">{value}</Typography>
                            <Chip size="small" color={color} label={trendValues[trend]} />
                        </Stack>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        {interval}
                        </Typography>
                    </Box>

                    <Box sx={{ width: '100%', height: 50 }}>
                        <svg style={{ height: 0 }}>
                            <AreaGradient color={chartColor} id={gradientId} />
                        </svg>
                        <SparkLineChart
                            height={50}
                            colors={[chartColor]}
                            data={paddedData}
                            area
                            showHighlight
                            showTooltip
                            xAxis={{
                                scaleType: 'band',
                                data: currentLabels,
                            }}
                            sx={{
                                [`& .${areaElementClasses.root}`]: {
                                fill: `url(#${gradientId})`,
                                },
                            }}
                        >
                            <AreaGradient color={chartColor} id={gradientId} />
                        </SparkLineChart>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

StatCard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    interval: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trend: PropTypes.oneOf(['down', 'neutral', 'up']).isRequired,
    value: PropTypes.string.isRequired,
};

export default StatCard;
