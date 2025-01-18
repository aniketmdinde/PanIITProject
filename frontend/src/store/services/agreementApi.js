import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const agreementApi = createApi({
  reducerPath: 'agreementApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ['Agreement'],
  endpoints: (builder) => ({
    getAllAgreements: builder.query({
      query: () => '/agreements/all',
      providesTags: ['Agreement'],
    }),
    getAgreement: builder.query({
        query: (id) => `/agreements?id=${id}`, // Add id as a query parameter
        providesTags: ['Agreement'],
      }),      
    createAgreement: builder.mutation({
      query: (formData) => ({
        url: '/agreements',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Agreement'],
    }),
    updateAgreement: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/agreements/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Agreement'],
    }),
  }),
});

export const {
  useGetAllAgreementsQuery,
  useGetAgreementQuery,
  useCreateAgreementMutation,
  useUpdateAgreementMutation,
} = agreementApi;