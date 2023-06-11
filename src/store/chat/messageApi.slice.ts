import { createEntityAdapter } from '@reduxjs/toolkit';

import { socket } from '@/providers/SocketProvider';

import { IDeleteMessagePayload, IMessage, ISendMessagePayload } from '@/shared/types/chat';

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
      async onCacheEntryAdded(chatId, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          const messagesListener = (eventMessage: IMessage) => {
            if (chatId === eventMessage.chat) {
              updateCachedData((draft) => {
                messagesAdapter.upsertOne(draft, eventMessage);
              });
            }
          };

          socket.on('NEW_MESSAGE', messagesListener);
        } catch (err) {
          console.log(err);
        }
        await cacheEntryRemoved;
        socket.off('NEW_MESSAGE');
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
          // update cache of messages immediately
          // dispatch(
          //   messageApiSlice.util.updateQueryData('getMessages', chatId, (draft) => {
          //     messagesAdapter.addOne(draft, newMessage);
          //   })
          // );
          socket.emit('NEW_MESSAGE', newMessage);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteMessage: builder.mutation<{ deletedId: string }, IDeleteMessagePayload>({
      query: (payload) => ({
        url: '/message/delete',
        method: 'DELETE',
        body: {
          messageId: payload.messageId,
        },
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            messageApiSlice.util.updateQueryData('getMessages', payload.chatId, (draft) => {
              messagesAdapter.removeOne(draft, payload.messageId);
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation, useDeleteMessageMutation } =
  messageApiSlice;
