export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: IAvatar | null;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
  avatar?: IAvatar | null;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUpdatePayload {
  username?: string;
  avatar?: IAvatar | null;
  email?: string;
}

export interface IAvatar {
  id: string;
  url: string;
}
