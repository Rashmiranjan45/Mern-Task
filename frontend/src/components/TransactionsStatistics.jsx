import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

const TransactionStatistics = ({ statistics }) =>{
  return (
<Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Statistics
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6" component="div">
                Total Sale
              </Typography>
              <Typography variant="body1">{statistics.totalSale}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" component="div">
                Sold Items
              </Typography>
              <Typography variant="body1">{statistics.soldItems}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" component="div">
                Not Sold Items
              </Typography>
              <Typography variant="body1">{statistics.notSoldItems}</Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TransactionStatistics;

