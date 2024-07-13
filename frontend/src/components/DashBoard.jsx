// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getCombinedData } from '../utils/fetchData';
import TransactionsTable from './TransactionsTable';
import TransactionStatistics from './TransactionsStatistics';
import BarChart from './BarChart';
import PieChart from './PieChart';
import { CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';

const Dashboard = () => {
  const [month, setMonth] = useState(3); // Default to March
  const [data, setData] = useState({
    transactions: [],
    statistics: [],
    barChart: [],
    pieChart: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(data?.data?.statistics)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const combinedData = await getCombinedData(month);
        setData(combinedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  

  return (
    <Container sx={{ padding: '16px' }}>
      <Typography variant="h1">Dashboard</Typography>
      <FormControl sx={{ marginBottom: '16px', minWidth: 200 }}>
        <InputLabel htmlFor="month">Select Month:</InputLabel>
        <Select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          label="Select Month"
          style={{ marginLeft: '8px' }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography variant="body1" color={"error"}>
          Error: {error}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TransactionStatistics statistics={data?.data?.statistics} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TransactionsTable transactions={data?.data?.transactions} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ padding: '16px' }}>
              <BarChart data={data?.data?.barChart} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ padding: '16px' }}>
              <PieChart data={data?.data?.pieChart} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
