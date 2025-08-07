import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <Box className={styles.home}>
      <Typography variant="h2" gutterBottom>
        Welcome to Coffee Shop
      </Typography>
      <Typography variant="h5" gutterBottom>
        Discover the best coffee in the world
      </Typography>
      <Button
        variant="contained"
        size="large"
        component={Link}
        to="/catalog"
        sx={{ mt: 3 }}
      >
        Browse Catalog
      </Button>
    </Box>
  );
};