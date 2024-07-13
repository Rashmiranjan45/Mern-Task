
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import {Box, Card, CardContent, Typography} from "@mui/material"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: 'Number of Items',
        data: data.map((item) => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#FFCD56',
          '#4BC0C0',
          '#9966FF',
          '#FF6384',
        ],
      },
    ],
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Pie Chart
        </Typography>
      <Box sx={{ height: 400 }}>
          <Pie data={chartData} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChart;

