import { IChat } from '@/shared/types/chat';

import { apiSlice } from '../api.slice';

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<IChat[], string>({
      query: () => ({
        url: '/chat/getAll',
      }),
    }),
  }),
});

export const { useGetChatsQuery } = chatApiSlice;
