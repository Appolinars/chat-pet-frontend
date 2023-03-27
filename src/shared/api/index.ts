import { localStorageHelper } from '../utils';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import axios, { AxiosInstance } from 'axios';

import { resetAuth } from '@/store/auth/authSlice';

import { IAuthResponse } from '../types/user';

export const API_URL = import.meta.env.VITE_API_URL;

export let $api: AxiosInstance;

export const setupAxiosInterceptors = (store: ToolkitStore) => {
  $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  $api.interceptors.request.use((config) => {
    const accessToken = localStorageHelper.get('token');
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  $api.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
          const response = await axios.get<IAuthResponse>(`${API_URL}/user/refresh`, {
            withCredentials: true,
          });
          localStorageHelper.set('token', response.data.accessToken);
          return $api?.request(originalRequest);
        } catch (e) {
          localStorageHelper.remove('token');
          store.dispatch(resetAuth());
          console.log('Not authorized');
        }
      }
      throw error;
    }
  );
};
