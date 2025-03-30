import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import { loginSuccess } from './store/slices/authSlice/AuthSlice';
import { RootState } from './store/store';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    // 1. localStorage'dan oturum bilgilerini al
    const savedAuth = localStorage.getItem('auth');
    
    if (savedAuth) {
      const { accessToken, user } = JSON.parse(savedAuth);
      
      // 2. Redux store'u güncelle
      if (accessToken) {
        dispatch(loginSuccess({ 
          accessToken, 
          user 
        }));
        // 3. Eğer giriş yapılmışsa home'a yönlendir
        navigate('/home');
      }
    } else {
      // 4. Eğer giriş yapılmamışsa signin'e yönlendir
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <SignIn />} />
      </Routes>
    </div>
  );
}

export default App;