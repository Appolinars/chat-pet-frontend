import { PropsWithChildren, useEffect } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';



import { userSelector } from '@/store/auth/auth.selectors';
import { chatApiSlice } from '@/store/chat/chatApi.slice';



import { IMessage } from '@/shared/types/chat';



import { useAppDispatch, useAppSelector } from '@/store';


export const socket = io(import.meta.env.VITE_API_URL);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      socket.emit('setup', user);
    }
  }, [user]);

  useEffect(() => {
    const messagesListener = (eventMessage: IMessage) => {
      console.log('NEW_MESSAGE EVENT', eventMessage);
      dispatch(
        chatApiSlice.util.updateQueryData('getChats', '', (draft) => {
          const updatedChat = draft.find((chat) => chat._id === eventMessage.chat);

          if (updatedChat) updatedChat!.latestMessage = eventMessage;
        })
      );
    };

    socket.on('NEW_MESSAGE', messagesListener);

    socket.on('SOCKET_ERROR', (error) => {
      toast.error(error);
    });

    return () => {
      socket.off('SOCKET_ERROR');
      socket.off('NEW_MESSAGE');
    };
  }, []);
  return <>{children}</>;
};