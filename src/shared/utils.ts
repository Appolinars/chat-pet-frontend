export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const errorCatch = (error: any): string =>
  (error.response && error.response.data && typeof error.response.data.message === 'object'
    ? error.response.data.message[0]
    : error?.response?.data?.message) ||
  error?.data?.message ||
  error.message ||
  error.toString();

const IS_CLIENT = typeof window !== 'undefined';

export const localStorageHelper = {
  get(key: string) {
    if (IS_CLIENT) {
      const stored = localStorage.getItem(key);
      return !stored ? null : JSON.parse(stored);
    }
  },
  set(key: string, value: string) {
    IS_CLIENT ? localStorage.setItem(key, JSON.stringify(value)) : null;
  },
  remove(key: string) {
    IS_CLIENT ? localStorage.removeItem(key) : null;
  },
};
