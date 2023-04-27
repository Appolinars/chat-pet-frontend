import { IUser } from '@/shared/types/user';

import { apiSlice } from '../api.slice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], string>({
      query: () => ({
        url: '/user/getAll',
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
