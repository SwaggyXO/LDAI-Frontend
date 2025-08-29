import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_CORE_MS_BASE_URL}/reward` });

export interface Achievement {
    rewardName: string;
    nextTier: {
        name: string;
        threshold: number;
        timeLimit: number;
        score: number;
    };
    currentTier: {
        completed: number;
        tier: string;
    };
}

export interface AllAchievement {
    name: string,
      description: string,
      type: string,
      thresholds: [
        {
          name: string,
          threshold: number,
          timeLimit: number,
          score: number
        }
      ],
      imageUrls: [
        string
      ]
}

export interface Achievements {
    achievements: Achievement[];
}
interface Response {
    code: number;
    status: string;
    data: Achievements;
    error: Object | null;
}

export const rewardApi = createApi({
  reducerPath: 'rewardApi',
  baseQuery, 
  tagTypes: ['Rewards'],
  endpoints: (builder) => ({
    fetchRewardsById: builder.query<Response, string>({
      query: (userId) => `/achievements/${userId}`,
      providesTags: ['Rewards'],
    }),
  }),
});

export const { 
    useFetchRewardsByIdQuery,
} = rewardApi;
