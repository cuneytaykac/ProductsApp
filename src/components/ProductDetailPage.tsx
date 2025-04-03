import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Grid,
    IconButton,
    Rating,
    Skeleton,
    Stack,
    Typography
} from '@mui/material';
import { FaHeart, FaShare, FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../store/apis/product/productApi';
import { addItem } from '../store/slices/basket/BasketSlice';
import Navbar from './HomeNavBar';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductByIdQuery(Number(id));
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    console.log('Ürün sepete eklendi:', product?.title);
    // Sepete ekleme işlemleri
        dispatch(addItem(product!));

  };

  if (isLoading) return (
    <div>
       <Navbar />
        <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid  size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid  size={{ xs: 12, md: 6 }}>
          <Skeleton variant="text" height={60} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={100} />
          <Skeleton variant="rectangular" height={50} sx={{ mt: 2 }} />
        </Grid>
      </Grid>
    </Box>
    </div>
    
  );

  if (error || !product) return <Typography>Ürün bulunamadı</Typography>;

  return (
    <div>
          <Navbar />
           <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
    
      

      <Card sx={{ 
        borderRadius: 2,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Grid container spacing={4}>
          {/* Ürün Görselleri */}
          <Grid  size={{ xs: 12, md: 6 }}>
            <Box sx={{
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              height: '100%'
            }}>
              <CardMedia
                component="img"
                image={product.thumbnail}
                alt={product.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 400,
                  objectFit: 'contain',
                  p: 2
                }}
              />
              <Stack direction="row" spacing={1} sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16,
                zIndex: 1
              }}>
                <IconButton sx={{ bgcolor: 'background.paper' }}>
                  <FaHeart />
                </IconButton>
                <IconButton sx={{ bgcolor: 'background.paper' }}>
                  <FaShare />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Ürün Bilgileri */}
          <Grid  size={{ xs: 12, md: 6 }}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.title}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={product.brand} color="primary" variant="outlined" />
                <Chip label={product.category} />
              </Stack>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.rating} · {product.stock} adet stok)
                </Typography>
              </Box>

              <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
                ${product.price.toFixed(2)}
                {product.discountPercentage > 0 && (
                  <Typography 
                    component="span" 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      ml: 1,
                      textDecoration: 'line-through'
                    }}
                  >
                    ${(product.price + (product.price * product.discountPercentage / 100)).toFixed(2)}
                  </Typography>
                )}
              </Typography>

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FaShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  sx={{ flex: 1 }}
                >
                  {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* Ekstra Bilgiler */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>Ürün Detayları</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid  size   ={{ xs: 6, md: 3 }}>
            <Typography variant="subtitle2">Marka</Typography>
            <Typography>{product.brand}</Typography>
          </Grid>
          <Grid  size   ={{ xs: 6, md: 3 }}>
            <Typography variant="subtitle2">Kategori</Typography>
            <Typography>{product.category}</Typography>
          </Grid>
          <Grid  size   ={{ xs: 6, md: 3 }}>
            <Typography variant="subtitle2">Stok</Typography>
            <Typography>{product.stock} adet</Typography>
          </Grid>
          <Grid  size   ={{ xs: 6, md: 3 }}>
            <Typography variant="subtitle2">İndirim</Typography>
            <Typography>{product.discountPercentage}%</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </div>
   
  );
}