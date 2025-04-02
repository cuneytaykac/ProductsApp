import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Fade,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useRef, useState } from 'react';
import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX
} from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from "../store/slices/authSlice/AuthSlice";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleClickAway = () => {
    if (searchOpen && !isMobile) {
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          py: 1,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          position: 'relative',
          px: { xs: 2, md: 4 }
        }}>
          {/* Logo ve Desktop Navigation */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { md: 4 },
            flex: searchOpen && !isMobile ? 0 : 1
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800,
                cursor: 'pointer',
                color: 'primary.main',
                mr: { md: 2 },
                display: searchOpen ? 'none' : 'block',
                fontFamily: '"Poppins", sans-serif',
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
              onClick={() => navigate('/')}
            >
              LOGOM
            </Typography>

            {!isMobile && !searchOpen && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  color="inherit" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                  onClick={() => navigate('/products')}
                >
                  Ürünler
                </Button>
                <Button 
                  color="inherit" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                  onClick={() => navigate('/categories')}
                >
                  Kategoriler
                </Button>
                <Button 
                  color="inherit" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                  onClick={() => navigate('/about')}
                >
                  Hakkımızda
                </Button>
              </Box>
            )}
          </Box>

          {/* Desktop Search - Animated */}
          {!isMobile && (
            <Fade in={searchOpen} timeout={300}>
              <Box 
                ref={searchRef}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50%',
                  maxWidth: 600
                }}
              >
                {searchOpen && (
                  <Box
                    component="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch();
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      borderRadius: 50,
                      px: 2,
                      py: 0.5,
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                      transition: 'all 0.3s ease',
                      '&:focus-within': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
                      }
                    }}
                  >
                    <FiSearch style={{ color: theme.palette.text.secondary }} />
                    <InputBase
                      autoFocus
                      fullWidth
                      placeholder="Ürün, kategori veya marka ara..."
                      sx={{
                        ml: 1,
                        py: 1,
                        '& input': {
                          padding: 0,
                          '&::placeholder': {
                            opacity: 0.8,
                            color: theme.palette.text.secondary
                          }
                        }
                      }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IconButton 
                      size="small" 
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      sx={{ color: 'text.secondary' }}
                    >
                      <FiX size={16} />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Fade>
          )}

          {/* Actions */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            ml: 'auto'
          }}>
            {!isMobile && !searchOpen && (
              <IconButton 
                onClick={() => setSearchOpen(true)}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                <FiSearch />
              </IconButton>
            )}
            
            {(!searchOpen || isMobile) && (
              <>
                <IconButton 
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1)
                    }
                  }}
                >
                  <Badge badgeContent={3} color="primary">
                    <FiShoppingCart />
                  </Badge>
                </IconButton>

                {isMobile ? (
                  <IconButton 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1)
                      }
                    }}
                  >
                    <FiMenu />
                  </IconButton>
                ) : (
                  <IconButton 
                    onClick={handleProfileMenuOpen}
                    sx={{
                      p: 0,
                      '&:hover': {
                        transform: 'scale(1.05)'
                      },
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <Avatar sx={{ 
                      width: 34, 
                      height: 34, 
                      bgcolor: 'primary.main',
                      fontSize: 16,
                      fontWeight: 500
                    }}>
                      KU
                    </Avatar>
                  </IconButton>
                )}
              </>
            )}

            {/* Mobile Search Button */}
            {isMobile && !searchOpen && (
              <IconButton 
                onClick={() => setSearchOpen(true)}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                <FiSearch />
              </IconButton>
            )}
          </Box>

          {/* Mobile Search - Full Screen Overlay */}
          {isMobile && searchOpen && (
            <Slide in={searchOpen} direction="down">
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1300,
                  backgroundColor: 'white',
                  boxShadow: 2,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <IconButton 
                  onClick={() => setSearchOpen(false)}
                  sx={{ color: 'text.primary' }}
                >
                  <FiX />
                </IconButton>
                <Box
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    borderRadius: 50,
                    px: 2,
                    py: 0.5,
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.2)
                  }}
                >
                  <FiSearch style={{ color: theme.palette.text.secondary }} />
                  <InputBase
                    autoFocus
                    fullWidth
                    placeholder="Ne aramıştınız?"
                    sx={{
                      ml: 1,
                      py: 1,
                      '& input': {
                        padding: 0,
                        '&::placeholder': {
                          opacity: 0.8,
                          color: theme.palette.text.secondary
                        }
                      }
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <IconButton 
                      size="small" 
                      onClick={() => setSearchQuery('')}
                      sx={{ color: 'text.secondary' }}
                    >
                      <FiX size={16} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Slide>
          )}

          {/* Mobile Menu */}
          {isMobile && mobileMenuOpen && (
            <Box 
              sx={{ 
                position: 'fixed',
                top: 60,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white',
                zIndex: 1200,
                p: 3,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Button 
                fullWidth 
                sx={{ 
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
                onClick={() => {
                  navigate('/products');
                  setMobileMenuOpen(false);
                }}
              >
                Ürünler
              </Button>
              <Button 
                fullWidth 
                sx={{ 
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
                onClick={() => {
                  navigate('/categories');
                  setMobileMenuOpen(false);
                }}
              >
                Kategoriler
              </Button>
              <Button 
                fullWidth 
                sx={{ 
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }}
              >
                Hakkımızda
              </Button>
              
              <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button 
                  fullWidth 
                  startIcon={<FiUser />}
                  sx={{ 
                    justifyContent: 'flex-start',
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1)
                    }
                  }}
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                >
                  Profilim
                </Button>
                <Button 
                  fullWidth 
                  sx={{ 
                    justifyContent: 'flex-start',
                    py: 1.5,
                    borderRadius: 1,
                    color: 'error.main',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.error.main, 0.1)
                    }
                  }}
                  onClick={() => {
                    dispatch(logout());
                    setMobileMenuOpen(false);
                  }}
                >
                  Çıkış Yap
                </Button>
              </Box>
            </Box>
          )}

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                overflow: 'visible',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem 
              onClick={() => {
                navigate('/profile');
                setAnchorEl(null);
              }}
              sx={{
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                }
              }}
            >
              <Avatar sx={{ 
                width: 32, 
                height: 32, 
                mr: 2,
                bgcolor: 'primary.main',
                fontSize: 14,
                fontWeight: 500
              }}>
                KU
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight={500}>Kullanıcı Adı</Typography>
                <Typography variant="body2" color="text.secondary">Profilimi Görüntüle</Typography>
              </Box>
            </MenuItem>
            <MenuItem 
              onClick={() => {
                navigate('/orders');
                setAnchorEl(null);
              }}
              sx={{
                '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
              }}
            >
              <Box sx={{ 
                width: 32, 
                height: 32, 
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main'
              }}>
                <FiShoppingCart />
              </Box>
              Siparişlerim
            </MenuItem>
            <MenuItem 
              onClick={handleMenuClose}
              sx={{
                '&:hover': {
                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                  color: 'error.main'
                }
              }}
            >
              <Box sx={{ 
                width: 32, 
                height: 32, 
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'error.main'
              }}>
                <FiX />
              </Box>
              Çıkış Yap
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ClickAwayListener>
  );
};

export default Navbar;