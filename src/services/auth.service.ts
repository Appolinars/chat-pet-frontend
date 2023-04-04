import axios from 'axios';

import { $api } from '@/shared/api';
import {
  IAuthResponse,
  ILoginPayload,
  IRegisterPayload,
  IUpdatePayload,
  IUser,
} from '@/shared/types/user';

export const authService = {
  async login(payload: ILoginPayload) {
    const response = await $api.post<IAuthResponse>('/user/login', payload);
    return response.data;
  },

  async register(payload: IRegisterPayload) {
    const response = await $api.post<IAuthResponse>('/user/register', payload);
    return response.data;
  },

  async logout() {
    const response = await $api.post('/user/logout');
    return response.data;
  },

  async refresh() {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await axios.get<IAuthResponse>(`${API_URL}/user/refresh`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

  async update(userData: IUpdatePayload) {
    const response = await $api.patch<IUser>('/user/update', userData);
    return response.data;
  },
};
