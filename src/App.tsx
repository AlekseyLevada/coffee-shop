import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home/Home';
import { Catalog } from '@/pages/Catalog/Catalog';
import { Product } from '@/pages/Product/Product';
import { Cart } from '@/pages/Cart/Cart';
import { Checkout } from '@/pages/Checkout/Checkout';
import { NotFound } from '@/pages/NotFound/NotFound';
import { Layout } from '@/components/Layout/Layout';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;