import { Box, Grid } from '@mui/material';
import { useGetProductsQuery } from '../store/apis/product/productApi';
import ProductItem from './ProductItem';

export default function ProductList() {
  const { data, isLoading, error } = useGetProductsQuery();
   

  return (
    <>
      {isLoading ? <div>Loading...</div> :

       <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{marginTop:5}} >
        {data?.products?.map((product, index) => (

        <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg:3 }} >
          <ProductItem product={product} />
        </Grid>
       
        ))}
      </Grid>
    </Box>
       }
    </>
  )
}
//
