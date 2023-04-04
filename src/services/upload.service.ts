import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IAvatar } from '@/shared/types/user';

export const API_URL = import.meta.env.VITE_API_URL;

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<IAvatar, FormData>({
      query: (fileData) => ({
        url: `/file/upload`,
        method: 'POST',
        body: fileData,
      }),
    }),
    deleteFile: builder.mutation<{ message: string }, string>({
      query: (public_id: string) => ({
        url: `/file/delete`,
        method: 'DELETE',
        body: {
          public_id,
        },
      }),
    }),
  }),
});

export const { useUploadFileMutation, useDeleteFileMutation } = uploadApi;
