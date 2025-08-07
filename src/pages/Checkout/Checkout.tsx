import { useState } from 'react';
import { Box, Typography, Button, TextField, Grid, Paper, Alert } from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import styles from './Checkout.module.scss';

export const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь должна быть логика обработки платежа
    console.log('Order submitted:', { formData, cartItems });
    clearCart();
    setOrderCompleted(true);
  };

  if (cartItems.length === 0 && !orderCompleted) {
    return (
      <Box className={styles.emptyCart}>
        <Typography variant="h5">Your cart is empty</Typography>
      </Box>
    );
  }

  if (orderCompleted) {
    return (
      <Box className={styles.success}>
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h5">Order Completed Successfully!</Typography>
        </Alert>
        <Typography variant="body1" paragraph>
          Thank you for your purchase. Your order has been received and is being processed.
        </Typography>
        <Button variant="contained" href="/catalog">
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box className={styles.checkout}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                multiline
                rows={3}
              />
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Payment Details
              </Typography>
              <TextField
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Expiry Date"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 3 }}
              >
                Place Order (${totalPrice.toFixed(2)})
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', mb: 2 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 60, height: 60, marginRight: 16 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography>{item.name}</Typography>
                  <Typography color="text.secondary">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Typography>
                  ${(item.quantity * item.price).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};