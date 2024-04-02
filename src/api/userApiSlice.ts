import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/user' });

type CreateUserRequest = {
    ciamId: string;
    timeZone: string;
}

type User = {
    id: string;
    ciamId: string;
    grade: string;
    subject: string | null;
    marbles: number;
    xp: number;
    streak: number;
    isNew: boolean;
    timeZone: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery, 
  endpoints: builder => ({
    fetchUserById: builder.query<User, string>({
        query: (userId) => `/fetch/${userId}`,
    }),
    createUser: builder.mutation<User, CreateUserRequest>({
      query: requestData => ({
        url: '/create',
        method: 'POST',
        body: requestData,
      }),
    }),
    updateUser: builder.mutation<User, Partial<User>>({
        query: (body) => ({
          url: `/update`,
          method: 'PATCH', // Adjust method to PATCH
          body,
        }),
    }),
  }),
});

export const { 
    useFetchUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,

} = usersApi;
