import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse } from "../../models/products/ProductsResponse";


export const ProductAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/',
       
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<ProductResponse, void>({
            query: () => ({
                url: 'products',
                method: 'GET',
            }),
           
        }),
    }),
});
export const { useGetProductsQuery } = ProductAPI; 
