import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, Stack, Divider, Snackbar, Alert } from '@mui/material';
import { fetchCoffeeById } from '@/utils/api';
import { useCart } from '@/contexts/CartContext';
import type { Coffee } from '@/types/coffee';
import styles from './Product.module.scss';

export const Product = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [coffee, setCoffee] = useState<Coffee | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const type = searchParams.get('type') as 'hot' | 'iced';
        const data = await fetchCoffeeById(id, type);
        setCoffee(data);
      } catch (error) {
        console.error(error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, searchParams, navigate]);

  const handleAddToCart = () => {
    if (!coffee) return;
    addToCart(coffee);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!coffee) return <Typography>Product not found</Typography>;

  return (
    <Box className={styles.product}>
      <Box className={styles.imageContainer}>
        <img src={coffee.image} alt={coffee.name} className={styles.image} />
      </Box>
      <Box className={styles.details}>
        <Typography variant="h3" gutterBottom>
          {coffee.name}
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          ${coffee.price?.toFixed(2)}
        </Typography>
        <Typography variant="body1" paragraph>
          {coffee.description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Ingredients:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          {coffee.ingredients.map((ingredient, index) => (
            <Chip key={index} label={ingredient} />
          ))}
        </Stack>
        <Button 
          variant="contained" 
          size="large"
          onClick={handleAddToCart}
          fullWidth
        >
          Add to Cart
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {coffee.name} added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};