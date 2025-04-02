import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductResponse } from "../../models/products/ProductsResponse";


export const ProductAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/',
       
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductResponse, void>({
            providesTags: ['Products'],
            query: () => ({
                url: 'products',
                method: 'GET',
            }),
           
        }),
        productSearch:builder.query<ProductResponse, string>({
            query: (searchTerm) => ({
                url: `products/search`,
                method: 'GET',
                params: { q: searchTerm },
            }),
          
           
        }),
        getProductById: builder.query<Product, number>({
  query: (id) => `products/${id}`,
}),
        
    }),
    
});
export const { useGetProductsQuery, useProductSearchQuery,useGetProductByIdQuery} = ProductAPI; 




