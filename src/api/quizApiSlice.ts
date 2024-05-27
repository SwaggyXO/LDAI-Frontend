import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/quiz' });

export interface Coords {
  x: number;
  y: number;
  z: number;
}
export interface Question {
  id: string;
  question: string;
  imageUrl: string | null;
  options: string[];
  paraphrased: string;
  model?: string;
  scale?: number;
  annotations?: {
    lookAt: Coords;
    cameraPos: Coords;
  }[];
}

export interface Quiz {
  quizId: string;
  questions: Question[];
  title: string;
  description: string;
  subject: string;
  quizType: string;
  timelimit: number;
  imageUrl: string;
  createdAt: string;
}

interface Response {
  code: number;
  status: string;
  data: Quiz;
  error: Object | null;
}

interface QuitResponse {
  code: number;
  status: string;
  data: string;
  error: Object | null;
}

export interface ArrayResponse {
  code: number;
  status: string;
  data: Array<Quiz>;
  error: Object | null;
}

export interface LeaderboardData {
  quiz: {
    id: string;
    title: string;
    description: string;
    subject: string;
    quizType: string;
    timelimit: number;
  },
  leaderboard: [
    {
      userId: string;
      name: string;
      score: number;
      timeTaken: number;
      picture: string;
    }
  ]
}

export interface LeaderboardResponse {
  code: number;
  status: string;
  data: LeaderboardData;
  error: Object | null;
}

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery,
  tagTypes: ['Quiz'],
  endpoints: (builder) => ({
    fetchQuizById: builder.query<Response, string>({
      query: (quizId) => `/${quizId}`,
      providesTags: ['Quiz'],
    }),
    fetchLatestQuizzes: builder.query<ArrayResponse, { limit?: number, subject: string, quizType?: string }>({
      query: ({ limit, subject, quizType }) => {
        let url = `/fetch/latest?subject=${subject}`;
        if (limit) url += `&limit=${limit}`;
        if (quizType) url += `&quizType=${quizType}`;
        return url;
      },
      providesTags: ['Quiz'],
    }),
    fetchLeaderboard: builder.query<LeaderboardResponse, void>({
      query: () => `/leaderboard`,
      providesTags: ['Quiz'],
    }),
    quitQuiz: builder.query<QuitResponse, string>({
      query: (userId) => `/quit/${userId}`,
      providesTags: ['Quiz'],
    }),
  }),
});

export const {
  useFetchQuizByIdQuery,
  useFetchLatestQuizzesQuery,
  useQuitQuizQuery,
  useFetchLeaderboardQuery,
} = quizApi;
