import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetProductsQuery, useProductSearchQuery } from '../store/apis/product/productApi';
import ProductItem from './ProductItem';
import ProductItemSkeleton from './ProductItemSkeleton';

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
  const isSearchActive = searchTerm.length >= 2;
  const noResultsFound = isSearchActive && searchedData?.products?.length === 0;

  return (
    <>
      {(isLoading || (isSearchActive && isSearching)) ? (
      <Grid container spacing={2} sx={{ marginTop: 5 }}>
              {[...Array(8)].map((_, index) => (
                <Grid  key={index} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                  <ProductItemSkeleton />
                </Grid>
              ))}
            </Grid>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          {noResultsFound ? (
            <Typography variant="h6" align="center" sx={{ mt: 5 }}>
              "Aramanızla eşleşen ürün bulunamadı"
            </Typography>
          ) : (
            <Grid container spacing={2} sx={{ marginTop: 5 }}>
              {productsToDisplay?.map((product, index) => (
                <Grid  key={index} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                  <ProductItem product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </>
  );
}