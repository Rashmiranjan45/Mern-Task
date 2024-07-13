import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Card, CardContent, Typography } from '@mui/material';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Bar Chart
        </Typography>
        <Box sx={{ height: 400 }}>
          <Bar data={chartData} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarChart;

