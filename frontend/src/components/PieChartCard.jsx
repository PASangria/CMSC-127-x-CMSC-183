import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#FF6384", "#36A2EB"];

const PieChartCard = ({ title, data }) => (
    <Card elevation={3}>
        <CardContent>
        <Typography variant="subtitle1" fontWeight="medium" mb={2}>
            {title}
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
            <Pie data={data} dataKey="value" nameKey="label" outerRadius={80} label>
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
        </CardContent>
    </Card>
);

export default PieChartCard;
