import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import styles from './Cart.module.scss';

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <Box className={styles.emptyCart}>
        <Typography variant="h5">Your cart is empty</Typography>
        <Button component={Link} to="/catalog" variant="contained" sx={{ mt: 2 }}>
          Browse Catalog
        </Button>
      </Box>
    );
  }

  return (
    <Box className={styles.cart}>
      <Typography variant="h4" gutterBottom>
        Your Cart ({totalItems} items)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 50, height: 50, marginRight: 16 }}
                    />
                    <Typography>{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    inputProps={{ min: 1 }}
                    sx={{ width: 80 }}
                  />
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Typography variant="h5" gutterBottom>
          Total: ${totalPrice.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={clearCart}
          sx={{ mr: 2 }}
        >
          Clear Cart
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/checkout"
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};