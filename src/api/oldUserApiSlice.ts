import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type UserInfo = {
  id: string;
  ciamid: string;
  grade: number | null;
  subject: string | null;
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

type Subject = {
  id: number;
  subjects: string[]
}

type Booster = {
  id: string;
  quantity: number;
  desc: string;
  rarity: string;
}

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3500' });

export const oldUserApi = createApi({
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
    getUserSubjects: builder.query<Subject[], number>({
      query: (grade) => `/grades/${grade.toString()}`,
    }),
    getUserBoosters: builder.query<Booster[], void>({
      query: () => '/boosters',
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
    updateUserBoosters: builder.mutation<Booster, [id: string, Partial<Booster>]>({
      query: ( [id, data] ) => ({
        url: `/boosters/${id}`,
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
  useGetUserSubjectsQuery,
  useGetUserBoostersQuery,
  useCreateUserMutation,
  useUpdateUserInfoMutation,
  useUpdateUserStatsMutation,
  useUpdateUserAchievementsMutation,
  useUpdateUserBoostersMutation
} = oldUserApi;
