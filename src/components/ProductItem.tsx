import { Box, Button, Card, CardContent, CardMedia, Chip, Rating, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Product } from '../store/models/products/ProductsResponse';
import { addItem } from '../store/slices/basket/BasketSlice';

export default function ProductItem({ product }: { product: Product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Olayın üst elementlere yayılmasını engeller
    console.log('Ürün sepete eklendi:', product.title);
    dispatch(addItem(product));
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3
        }
      }} 
      onClick={handleCardClick}
    >
      {/* Ürün Resmi */}
      {product.thumbnail && (
        <CardMedia
          component="img"
          height="140"
          image={product.thumbnail}
          alt={product.title}
          sx={{ objectFit: 'contain', p: 1 }}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Ürün Başlığı */}
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        
        {/* Marka ve Kategori */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Chip label={product.brand} size="small" color="primary" variant="outlined" />
          <Chip label={product.category} size="small" />
        </Box>
        
        {/* Ürün Açıklaması */}
        <Typography variant="body2" color="text.secondary" sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          mb: 1
        }}>
          {product.description}
        </Typography>
        
        {/* Ürün Değerlendirmesi */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.rating})
          </Typography>
        </Box>
        
        {/* Stok Bilgisi */}
        <Typography variant="body2" color="text.secondary">
          Stok: {product.stock} adet
        </Typography>
      </CardContent>
      
      {/* Fiyat ve Sepete Ekle Butonu */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2 
        }}
        onClick={(e) => e.stopPropagation()} // Buton alanında kart tıklamasını engelle
      >
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
        <Button 
          variant="contained" 
          size="small"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          sx={{
            zIndex: 1, // Butonun tıklanabilirliğini garanti altına al
          }}
        >
          {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
        </Button>
      </Box>
    </Card>
  );
}