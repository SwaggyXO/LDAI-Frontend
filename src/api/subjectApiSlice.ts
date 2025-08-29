import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_CORE_MS_BASE_URL}/subject` });


interface Subject {
  name: string;
  description: string;
  grade: string;
  imageUrl: string;
}

interface Response {
    code: number;
    status: string;
    data: Subject[];
    error: Object | null;
}


export const subjectApi = createApi({
  reducerPath: 'subjectApi',
  baseQuery, 
  tagTypes: ['Subject'],
  endpoints: (builder) => ({
    fetchSubjectsByGrade: builder.query<Response, string>({
      query: (grade) => `/fetch?grade=${grade}`,
      providesTags: ['Subject'],
    }),
  }),
});

export const { 
    useFetchSubjectsByGradeQuery
} = subjectApi;
