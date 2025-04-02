import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ProductDetailPage from './components/ProductDetailPage';
import SignIn from './components/SignIn';
import { loginSuccess } from './store/slices/authSlice/AuthSlice';
import { RootState } from './store/store';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    
    if (savedAuth) {
      const { accessToken, user } = JSON.parse(savedAuth);
      
      if (accessToken) {
        dispatch(loginSuccess({ 
          accessToken, 
          user 
        }));
        // Sadece ana sayfadaysak home'a yönlendir
        if (window.location.pathname === '/') {
          navigate('/home');
        }
      }
    } else {
      // Sadece giriş sayfasında değilsek yönlendir
      if (window.location.pathname !== '/') {
        navigate('/');
      }
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <SignIn />} />
        <Route 
          path="/products/:id" 
          element={isAuthenticated ? <ProductDetailPage /> : <SignIn />} 
        />
      </Routes>
    </div>
  );
}

export default App;