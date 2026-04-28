import React from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  IconButton
} from '@mui/material';
import { Visibility, ShoppingBag } from '@mui/icons-material';

const OrderHistory = () => {
  // Mock data for orders
  const orders = [
    { id: '#ORD-7742', date: 'Oct 12, 2026', total: '₹1,540.00', status: 'Delivered', items: 3 },
    { id: '#ORD-8821', date: 'Sep 28, 2026', total: '₹450.00', status: 'Processing', items: 1 },
    { id: '#ORD-9910', date: 'Aug 15, 2026', total: '₹2,100.00', status: 'Cancelled', items: 5 },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <ShoppingBag sx={{ color: '#2D6A4F' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
          Order History
        </Typography>
      </Box>

      {orders.length > 0 ? (
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F9FAF4' }}>
                <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{order.total}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      size="small"
                      sx={{ 
                        borderRadius: 0,
                        fontWeight: 600,
                        bgcolor: order.status === 'Delivered' ? '#E8F5E9' : order.status === 'Cancelled' ? '#FFEBEE' : '#FFF3E0',
                        color: order.status === 'Delivered' ? '#2D6A4F' : order.status === 'Cancelled' ? '#D32F2F' : '#F57C00'
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" title="View Details">
                      <Visibility fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary">You haven't placed any orders yet.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrderHistory;
