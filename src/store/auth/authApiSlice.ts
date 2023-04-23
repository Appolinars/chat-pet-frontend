import {
  IAuthResponse,
  IAvatar,
  ILoginPayload,
  IRegisterPayload,
  IUpdatePayload,
  IUser,
} from '@/shared/types/user';
import { localStorageHelper } from '@/shared/utils';

import { apiSlice } from '../apiSlice';

import { resetAuth, setUser } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, IRegisterPayload>({
      query: (body) => ({
        url: '/user/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorageHelper.set('token', data.accessToken);
          dispatch(setUser(data.user));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    login: builder.mutation<IAuthResponse, ILoginPayload>({
      query: (body) => ({
        url: '/user/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorageHelper.set('token', data.accessToken);
          dispatch(setUser(data.user));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorageHelper.remove('token');
          dispatch(resetAuth());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    checkAuth: builder.mutation({
      query: () => ({
        url: '/user/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorageHelper.set('token', data.accessToken);
          dispatch(setUser(data.user));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateUser: builder.mutation<IUser, IUpdatePayload>({
      query: (body) => ({
        url: '/user/update',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateAvatar: builder.mutation<IUser, IAvatar | null>({
      query: (avatar) => ({
        url: '/user/update',
        method: 'PATCH',
        body: {
          avatar,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getUsers: builder.mutation({
      query: () => ({
        url: '/user/getAll',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthMutation,
  useGetUsersMutation,
  useUpdateUserMutation,
  useUpdateAvatarMutation,
} = authApiSlice;
