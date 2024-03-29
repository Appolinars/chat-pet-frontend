import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import { IAuthResponse } from '../shared/types/user';

import { resetAuth } from './auth/auth.slice';

export const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get('token_pet');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

interface RefreshResult {
  data: IAuthResponse;
  error?: FetchBaseQueryError | null;
}

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  let isRetryDone = false;

  if (result?.error?.status === 401 && !isRetryDone) {
    // send refresh token to get new access token
    const refreshResult = (await baseQuery('/user/refresh', api, extraOptions)) as RefreshResult;
    isRetryDone = true;
    if (refreshResult?.data && !refreshResult?.error) {
      // store the new token
      Cookies.set('token_pet', refreshResult.data.accessToken);
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      Cookies.remove('token_pet');
      api.dispatch(resetAuth());
      console.log('Not authorized');
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Message', 'Chat'],
  endpoints: () => ({}),
});
