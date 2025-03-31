import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser
} from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from "../store/slices/authSlice/AuthSlice";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        py: 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            cursor: 'pointer',
            color: 'primary.main'
          }}
          onClick={() => navigate('/')}
        >
          LOGOM
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              sx={{ fontWeight: 600 }}
              onClick={() => navigate('/products')}
            >
              Ürünler
            </Button>
            <Button 
              color="inherit" 
              sx={{ fontWeight: 600 }}
              onClick={() => navigate('/categories')}
            >
              Kategoriler
            </Button>
            <Button 
              color="inherit" 
              sx={{ fontWeight: 600 }}
              onClick={() => navigate('/about')}
            >
              Hakkımızda
            </Button>
          </Box>
        )}

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <FiSearch />
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <FiShoppingCart />
            </Badge>
          </IconButton>

          {isMobile ? (
            <IconButton 
              color="inherit"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FiMenu />
            </IconButton>
          ) : (
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                <FiUser />
              </Avatar>
            </IconButton>
          )}
        </Box>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <Box 
            sx={{ 
              position: 'absolute',
              top: 60,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              boxShadow: 2,
              zIndex: 1,
              p: 2
            }}
          >
            <Button 
              fullWidth 
              sx={{ justifyContent: 'flex-start', mb: 1 }}
              onClick={() => {
                navigate('/products');
                setMobileMenuOpen(false);
              }}
            >
              Ürünler
            </Button>
            <Button 
              fullWidth 
              sx={{ justifyContent: 'flex-start', mb: 1 }}
              onClick={() => {
                navigate('/categories');
                setMobileMenuOpen(false);
              }}
            >
              Kategoriler
            </Button>
            <Button 
              fullWidth 
              sx={{ justifyContent: 'flex-start' }}
              onClick={() => {
                navigate('/about');
                setMobileMenuOpen(false);
              }}
            >
              Hakkımızda
            </Button>
          </Box>
        )}

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              minWidth: 180,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: 1,
                mr: 2,
              },
            }
          }}
        >
          <MenuItem onClick={() => {
            navigate('/profile');
            handleMenuClose();
          }}>
            <Avatar /> Profilim
          </MenuItem>
          <MenuItem onClick={() => {
            navigate('/orders');
            handleMenuClose();
          }}>
            Siparişlerim
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Çıkış Yap
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;