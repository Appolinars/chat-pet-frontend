import { IChat, ICreateChatPayload } from '@/shared/types/chat';

import { apiSlice } from '../api.slice';

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<IChat[], string>({
      query: () => ({
        url: '/chat/getAll',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: 'Chat', id: 'LIST' },
              ...result.map((chat) => ({ type: 'Chat' as const, id: chat._id })),
            ]
          : [{ type: 'Chat', id: 'LIST' }],
    }),
    createChat: builder.mutation<IChat, ICreateChatPayload>({
      query: (payload) => ({
        url: '/chat/create',
        method: 'POST',
        body: {
          partnerId: payload.partnerId,
        },
      }),
      async onQueryStarted({ partnerId, navigate }, { dispatch, queryFulfilled }) {
        try {
          const { data: newChat } = await queryFulfilled;
          dispatch(
            chatApiSlice.util.updateQueryData('getChats', partnerId, (draft) => {
              console.log(draft);
              draft.push(newChat);
            })
          );
          
          // navigate(`/chat/${newChat._id}`);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetChatsQuery, useCreateChatMutation } = chatApiSlice;
