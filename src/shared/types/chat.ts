import { IAvatar } from './user';


export interface IChatUser {
  _id: string;
  username: string;
  avatar: IAvatar;
}

export interface IMessage {
  _id: string;
  sender: IChatUser;
  content: string;
  chat: string;
  read: boolean;
}

export interface IChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: IChatUser[];
  latestMessage: IMessage;
  groupAdmin: string;
  createdAt: string;
  updatedAt: string;
}