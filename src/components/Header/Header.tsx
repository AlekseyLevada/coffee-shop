import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import styles from './Header.module.scss';

export const Header = () => {
  const { totalItems } = useCart();
  
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className={styles.logo}>
            Coffee Shop
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/catalog">
          Catalog
        </Button>
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};