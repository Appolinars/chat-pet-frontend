export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUpdatePayload {
  username: string;
  avatar: string;
  email: string;
}
