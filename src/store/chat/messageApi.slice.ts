import { createEntityAdapter } from '@reduxjs/toolkit';

import { IMessage, ISendMessagePayload } from '@/shared/types/chat';

import { apiSlice } from '../api.slice';

const messagesAdapter = createEntityAdapter<IMessage>({
  selectId: (message) => message._id,
});
const initialState = messagesAdapter.getInitialState();

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (chatId: string) => ({
        url: `/message/get/${chatId}`,
      }),
      transformResponse: (responseData: IMessage[]) => {
        return messagesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result?.ids
          ? [
              { type: 'Message', id: 'LIST' },
              ...result.ids.map((id) => ({ type: 'Message' as const, id })),
            ]
          : [{ type: 'Message', id: 'LIST' }],
    }),
    sendMessage: builder.mutation<IMessage, ISendMessagePayload>({
      query: (body) => ({
        url: '/message/send',
        method: 'POST',
        body,
      }),
      async onQueryStarted({ chatId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newMessage } = await queryFulfilled;
          dispatch(
            messageApiSlice.util.updateQueryData('getMessages', chatId, (draft) => {
              messagesAdapter.addOne(draft, newMessage);
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApiSlice;
