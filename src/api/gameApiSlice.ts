import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const boosterBaseQuery = fetchBaseQuery({ baseUrl: 'https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/booster'});

const inventoryBaseQuery = fetchBaseQuery({ baseUrl: 'https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/inventory'});

export interface Booster {
    id: string,
    name: string,
    description: string,
    price: number,
    tier: string,
}

interface AllResponse {
    code: number,
    data: Booster[],
    status: string,
    error: Object
}

export interface InventoryItem {
    booster: Booster,
    quantity: number
}

interface UserBoosterResponseData {
    userId: string,
    inventory: InventoryItem[]
}

export interface UserBoosterResponse {
    code: number,
    data: UserBoosterResponseData,
    status: string,
    error: Object
}

export const boosterApi = createApi({
  reducerPath: 'boosterApi',
  baseQuery: boosterBaseQuery, 
  tagTypes: ['Booster'],
  endpoints: (builder) => ({
    fetchAllBoosters: builder.query<AllResponse, void>({
      query: () => `/fetch/all`,
      providesTags: ['Booster'],
    }),
  }),
});

export const inventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: inventoryBaseQuery,
    tagTypes: ['Inventory'],
    endpoints: (builder) => ({
        fetchUserBoosters: builder.query<UserBoosterResponse, string>({
            query: (userId) => `/${userId}/boosters`,
            providesTags: ['Inventory'],
        }),
    }),
});

export const { 
    useFetchAllBoostersQuery,
} = boosterApi;

export const { 
    useFetchUserBoostersQuery,
} = inventoryApi;
