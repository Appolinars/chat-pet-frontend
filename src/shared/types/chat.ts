import { NavigateFunction } from 'react-router-dom';

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
  createdAt: string;
  updatedAt: string;
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

export interface ICreateChatPayload {
  partnerId: string;
  navigate: NavigateFunction;
}

export interface ISendMessagePayload {
  chatId: string;
  content: string;
}

export interface IDeleteMessagePayload {
  chatId: string;
  messageId: string;
}
