/*import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetProductsQuery, useProductSearchQuery } from '../store/apis/product/productApi';
import ProductItem from './ProductItem';

export default function ProductList() {
  const { data, isLoading, error } = useGetProductsQuery();
  const searchTerm = useSelector((state:any) => state.search.term);

 const {searchedData}= useProductSearchQuery(
  searchTerm, 
  { 
    skip: searchTerm.length < 2 ,
    //  karakterden azsa atla
  }
 
);
   

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
*/

import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetProductsQuery, useProductSearchQuery } from '../store/apis/product/productApi';
import ProductItem from './ProductItem';

export default function ProductList() {
  const { data, isLoading, error } = useGetProductsQuery();
  const searchTerm = useSelector((state: any) => state.search.term);

  const { data: searchedData, isLoading: isSearching } = useProductSearchQuery(
    searchTerm, 
    { 
      skip: searchTerm.length < 2 // 2 karakterden azsa atla
    }
  );

  // Gösterilecek veriyi belirle: arama varsa arama sonuçları, yoksa normal ürünler
  const productsToDisplay = searchTerm.length >= 2 ? searchedData?.products : data?.products;

  return (
    <>
      {(isLoading || (searchTerm.length >= 2 && isSearching)) ? (
        <div>Loading...</div>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ marginTop: 5 }}>
            {productsToDisplay?.map((product, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}

