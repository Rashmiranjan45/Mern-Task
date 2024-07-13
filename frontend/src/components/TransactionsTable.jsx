import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const TransactionsTable = ({ transactions }) => {
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions.data.filter(
    (transaction) =>
      transaction.title.toLowerCase().includes(search.toLowerCase()) ||
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.price.toString().includes(search)
  );

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" component="div" gutterBottom>
        Transactions
      </Typography>
      <TextField
        label="Search transactions"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>${transaction.price}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionsTable;
