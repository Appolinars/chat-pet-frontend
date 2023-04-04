import { IUser } from '@/shared/types/user';


export interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  checkAuthSuccess: boolean;
  checkAuthError: boolean;
  isAvatarUpdating: boolean;
}