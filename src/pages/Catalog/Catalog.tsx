import { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Grid, Card, CardContent, CardMedia, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchHotCoffees, fetchIcedCoffees } from '@/utils/api';
import { useCart } from '@/contexts/CartContext';
import type { Coffee } from '@/types/coffee';
import styles from './Catalog.module.scss';

export const Catalog = () => {
  const [tabValue, setTabValue] = useState(0);
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentCoffee, setCurrentCoffee] = useState<Coffee | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = tabValue === 0 ? await fetchHotCoffees() : await fetchIcedCoffees();
        setCoffees(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tabValue]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddToCart = (coffee: Coffee) => {
    addToCart(coffee);
    setCurrentCoffee(coffee);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Hot Coffees" />
        <Tab label="Iced Coffees" />
      </Tabs>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {coffees.map((coffee) => (
          <Grid item xs={12} sm={6} md={4} key={coffee.id}>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                height="200"
                image={coffee.image}
                alt={coffee.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {coffee.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${coffee.price?.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleAddToCart(coffee)}
                >
                  Add to Cart
                </Button>
                <Button
                  component={Link}
                  to={`/product/${coffee.id}?type=${tabValue === 0 ? 'hot' : 'iced'}`}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {currentCoffee?.name} added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};