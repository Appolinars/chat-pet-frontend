import { store } from '..';

import { socket } from '@/providers/SocketProvider';

import { IUser } from '@/shared/types/user';

import { apiSlice } from '../api.slice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], string>({
      query: () => ({
        url: '/user/getAll',
      }),
      transformResponse(response: IUser[]) {
        const currentUserId = store.getState().auth.user?._id;
        const filteredUsers = response.filter((user) => user._id !== currentUserId);
        return filteredUsers;
      },
    }),
    getOnlineUsers: builder.query<string[], string>({
      query: () => ({
        url: '/user/getOnlineUsers',
      }),
      async onCacheEntryAdded(_, { dispatch, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          const onlineUsersListener = (userId: string) => {
            console.log('USER: ' + userId);
            dispatch(
              usersApiSlice.util.updateQueryData('getOnlineUsers', '', (draft) => {
                if (!draft.includes(userId)) draft.push(userId);
              })
            );
          };

          const userOfflineListener = (userId: string) => {
            dispatch(
              usersApiSlice.util.updateQueryData('getOnlineUsers', '', (draft) => {
                return draft.filter((id) => id !== userId);
              })
            );
          };

          socket.on('USER_ONLINE', onlineUsersListener);
          socket.on('USER_OFFLINE', userOfflineListener);
        } catch (err) {
          console.log(err);
        }
        await cacheEntryRemoved;
        socket.off('USER_ONLINE');
        socket.off('USER_OFFLINE');
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetOnlineUsersQuery } = usersApiSlice;
