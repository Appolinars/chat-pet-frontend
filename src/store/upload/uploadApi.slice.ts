import { IAvatar } from '@/shared/types/user';

import { apiSlice } from '../api.slice';

const uploadApi = apiSlice.injectEndpoints({
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
