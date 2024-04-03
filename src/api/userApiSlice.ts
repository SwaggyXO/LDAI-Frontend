import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/user' });

type CreateUserRequest = {
    ciamId: string;
    timeZone: string;
}

type User = {
    userId: string;
    ciamId: string;
    grade: string;
    subjectId: string | null;
    marbles: number;
    xp: number;
    streak: number;
    isNew: boolean;
    timeZone: string;
}

interface CreateResponseData {
  newlyCreated: boolean,
  user: User
}

interface CreateResponse {
  code: number;
  status: string;
  data: CreateResponseData;
  error: Object | null;
}

interface FetchResponse {
  code: number;
  status: string;
  data: User;
  error: Object | null;
}

interface UpdateResponse {
  data: FetchResponse
}


export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery, 
  endpoints: builder => ({
    fetchUserById: builder.query<FetchResponse, string>({
        query: (ciamId) => `/fetch/${ciamId}`,
    }),
    createUser: builder.mutation<CreateResponse, CreateUserRequest>({
      query: requestData => ({
        url: '/create',
        method: 'POST',
        body: requestData,
      }),
    }),
    updateUser: builder.mutation<UpdateResponse, Partial<User>>({
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
