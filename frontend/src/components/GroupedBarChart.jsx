import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function GroupedBarChart({
    data,
    keys,
    xKey,
    title = 'Grouped Bar Chart',
    totalValue = '1,245',
    subtitle = 'Enrollment per program as of May 2025',
    height
}) {
    const theme = useTheme();
    const colorPalette = [
        (theme.vars || theme).palette.primary.dark,
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.primary.light,
    ];

    const series = keys.map((key, index) => ({
        id: key,
        label: key,
        data: data.map((item) => item[key]),
        color: colorPalette[index % colorPalette.length],
    }));

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    {title}
                </Typography>

                <Stack sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h4" component="p">
                        {totalValue}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {subtitle}
                    </Typography>
                </Stack>

                <BarChart
                    borderRadius={8}
                    colors={colorPalette}
                    xAxis={[{
                        scaleType: 'band',
                        categoryGapRatio: 0.4,
                        data: data.map((item) => item[xKey]),
                        height: 24,
                    }]}
                    yAxis={[{ width: 50 }]}
                    series={series}
                    height={300}
                    margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
                    grid={{ horizontal: true }}
                    hideLegend
                />
            </CardContent>
        </Card>
    );
}
