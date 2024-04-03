import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/subject' });


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
  endpoints: (builder) => ({
    fetchSubjectsByGrade: builder.query<Response, string>({
      query: (grade) => `/fetch?grade=${grade}`,
    })
  }),
});

export const { 
    useFetchSubjectsByGradeQuery
} = subjectApi;
