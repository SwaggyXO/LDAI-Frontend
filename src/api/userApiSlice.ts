import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type UserInfo = {
  id: string;
  "ciam-id": string;
  grade: string | null;
  marbles: number;
  xp: number;
  isNew: boolean;
  timezone: string | null;
  streak: number;
}

type Stat = {
  name: string;
  val: number;
}

type Achievement = {
  name: string;
  description: string;
  level: number;
}

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3500' });

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserInfo[], void>({
      query: () => '/info',
    }),
    getUserStats: builder.query<Stat[], void>({
      query: () => '/stats',
    }),
    getUserAchievements: builder.query<Achievement[], void>({
      query: () => '/achievements',
    }),
    createUser: builder.mutation<void, Partial<UserInfo>>({
        query: (userData) => ({
          url: '/info',
          method: 'POST',
          body: userData,
        }),
    }),
    updateUserInfo: builder.mutation<void, { id: string; data: Partial<UserInfo> }>({
      query: ({ id, data }) => ({
        url: `/info/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    updateUserStats: builder.mutation<void, { data: Partial<Stat>[] }>({
      query: ({ data }) => ({
        url: '/stats',
        method: 'PATCH',
        body: data,
      }),
    }),
    updateUserAchievements: builder.mutation<void, { data: Partial<Achievement>[] }>({
      query: ({ data }) => ({
        url: '/achievements',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetUserStatsQuery,
  useGetUserAchievementsQuery,
  useCreateUserMutation,
  useUpdateUserInfoMutation,
  useUpdateUserStatsMutation,
  useUpdateUserAchievementsMutation,
} = userApi;
