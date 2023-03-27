import { $api } from '@/shared/api';

export const usersService = {
  async getAll() {
    const response = await $api.get('/user/getAll');
    return response.data;
  },
};
