import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Account } from './pages/Account';
import { Dashboard } from './pages/Dashboard';
import { Cart } from './pages/Cart';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchProducts } from './store/thunks';
import { loginSuccess } from './store/slices/userSlice';
import { fetchCurrentUser } from './store/thunks';
import './App.css';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(state => state.user);
  return isAuthenticated ? <>{children}</> : <Navigate to="/account" />;
};

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.user);
  
  useEffect(() => {
    // Load initial data from API
    dispatch(fetchProducts());
    
    // Check for existing user session in localStorage
    const token = localStorage.getItem('token');

    
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);
  
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
