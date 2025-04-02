import { Box, Card, CardContent, Skeleton } from '@mui/material';

export default function ProductItemSkeleton() {
  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      animation: 'pulse 1.5s infinite',
      '@keyframes pulse': {
        '0%': { opacity: 0.6 },
        '50%': { opacity: 0.3 },
        '100%': { opacity: 0.6 }
      }
    }}>
      {/* Ürün Resmi Skeleton */}
      <Skeleton 
        variant="rectangular" 
        height={140} 
        sx={{ 
          p: 1,
          bgcolor: 'grey.200'
        }} 
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Başlık Skeleton */}
        <Skeleton 
          variant="text" 
          width="80%" 
          height={32} 
          sx={{ 
            bgcolor: 'grey.200',
            mb: 2
          }} 
        />
        
        {/* Marka ve Kategori Skeleton */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton 
            variant="rounded" 
            width={60} 
            height={24} 
            sx={{ bgcolor: 'grey.200' }} 
          />
          <Skeleton 
            variant="rounded" 
            width={60} 
            height={24} 
            sx={{ bgcolor: 'grey.200' }} 
          />
        </Box>
        
        {/* Açıklama Skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" sx={{ bgcolor: 'grey.200' }} />
          <Skeleton variant="text" sx={{ bgcolor: 'grey.200' }} />
          <Skeleton variant="text" width="60%" sx={{ bgcolor: 'grey.200' }} />
        </Box>
        
        {/* Rating Skeleton */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton 
            variant="rounded" 
            width={100} 
            height={24} 
            sx={{ bgcolor: 'grey.200' }} 
          />
        </Box>
        
        {/* Stok Skeleton */}
        <Skeleton 
          variant="text" 
          width="40%" 
          sx={{ bgcolor: 'grey.200' }} 
        />
      </CardContent>
      
      {/* Fiyat ve Buton Skeleton */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2 
      }}>
        <Skeleton 
          variant="text" 
          width={60} 
          height={36} 
          sx={{ bgcolor: 'grey.200' }} 
        />
        <Skeleton 
          variant="rounded" 
          width={100} 
          height={36} 
          sx={{ bgcolor: 'grey.200' }} 
        />
      </Box>
    </Card>
  );
}