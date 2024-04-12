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

export interface Currency {
    name: string,
    amount: number
}

interface UserCurrencyRequest {
    userId: string,
    currency: Currency[]
}

export interface UserCurrencyResponse {
    code: number,
    data: {
        userId: string,
        marbles: number,
        xp: number
    },
    status: string,
    error: Object
}

export interface PurchaseBoosterRequest {
    userId: string,
    booster: Currency[],
}

export interface PurchaseBoosterResponse {
    code: number,
    data: {
        userId: string,
        purchases: [
            {
                booster: string,
                quantity: number,
                receipt: string
            }
        ]
    },
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
        addUserCurrency: builder.mutation<UserCurrencyResponse, UserCurrencyRequest>({
            query: requestData => ({
                url: `/add/currency`,
                method: 'POST',
                body: requestData
            }),
            invalidatesTags: ['Inventory'],
        }),
        subtractUserCurrency: builder.mutation<UserCurrencyResponse, UserCurrencyRequest>({
            query: requestData => ({
                url: `/subtract/currency`,
                method: 'POST',
                body: requestData
            }),
            invalidatesTags: ['Inventory'],
        }),
        purchaseBooster: builder.mutation<PurchaseBoosterResponse, PurchaseBoosterRequest>({
            query: requestData => ({
                url: `/add/booster`,
                method: 'POST',
                body: requestData
            }),
            invalidatesTags: ['Inventory'],
        }),
    }),
});

export const { 
    useFetchAllBoostersQuery,
} = boosterApi;

export const { 
    useFetchUserBoostersQuery,
    useAddUserCurrencyMutation,
    useSubtractUserCurrencyMutation,
    usePurchaseBoosterMutation
} = inventoryApi;
