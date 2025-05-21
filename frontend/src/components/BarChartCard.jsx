import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BarChartCard = ({ title, data, dataKey, xKey, color = "#d633ff" }) => (
    <Card elevation={3}>
        <CardContent>
        <Typography variant="subtitle1" fontWeight="medium" mb={2}>
            {title}
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} />
            </BarChart>
        </ResponsiveContainer>
        </CardContent>
    </Card>
);

export default BarChartCard;
