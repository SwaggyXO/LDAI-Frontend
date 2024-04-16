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

export interface BoosterUsedRequest {
    userId: string,
    quizId: string,
    questionId: string,
    boosterName: string
}

export interface BoosterUsedResponse {
    data: {
        boosterInfo: string | string[]
    }
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
                url: `/currency/add`,
                method: 'POST',
                body: requestData
            }),
            invalidatesTags: ['Inventory'],
        }),
        subtractUserCurrency: builder.mutation<UserCurrencyResponse, UserCurrencyRequest>({
            query: requestData => ({
                url: `/currency/subtract`,
                method: 'POST',
                body: requestData
            }),
            invalidatesTags: ['Inventory'],
        }),
        purchaseBooster: builder.mutation<PurchaseBoosterResponse, PurchaseBoosterRequest>({
            query: requestData => ({
                url: `/booster/add`,
                method: 'POST',
                body: requestData
            }),
            invalidatesTags: ['Inventory'],
        }),
        boosterUsed: builder.mutation<BoosterUsedResponse, BoosterUsedRequest>({
            query: requestData => ({
                url: `/booster/used`,
                method: 'POST',
                body: requestData
            }),
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
    usePurchaseBoosterMutation,
    useBoosterUsedMutation,
} = inventoryApi;
