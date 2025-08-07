import { Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl" className={styles.content}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};