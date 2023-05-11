import { store } from '..';

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
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
