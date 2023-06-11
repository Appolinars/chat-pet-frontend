import { useEffect, useState } from 'react';

import { TypingSvg } from '@/components/ui/TypingSvg';

import { socket } from '@/providers/SocketProvider';

import { userSelector } from '@/store/auth/auth.selectors';
import { useGetOnlineUsersQuery } from '@/store/users/usersApi.slice';

import { IChat, IChatUser } from '@/shared/types/chat';
import { getPartner } from '@/shared/utils/chatHelpers';

import { useAppSelector } from '@/store';

export const DialogHeaderInfo = ({ chat }: { chat: IChat }) => {
  const user = useAppSelector(userSelector);

  const [typingUsers, setTypingUsers] = useState<IChatUser[]>([]);

  const { data: onlineUsers } = useGetOnlineUsersQuery('');

  useEffect(() => {
    socket.on('USER_TYPING', (typingUser: IChatUser) => {
      setTypingUsers((prev) => [...prev, typingUser]);
    });
    socket.on('USER_STOPED_TYPING', (typingUser: IChatUser) => {
      setTypingUsers((prev) => prev.filter((user) => user._id !== typingUser._id));
    });
    return () => {
      socket.off('USER_TYPING');
      socket.off('USER_STOPED_TYPING');
    };
  }, []);

  const chatPartner = getPartner(user?._id, chat?.users);
  const isOnline = onlineUsers?.includes(chatPartner?._id || '');

  return (
    <>
      {typingUsers.length > 0 ? (
        <div className="flex items-center text-sm text-slate-400">
          <span className="mr-3">
            {typingUsers.map((user) => (
              <span>{user.username}</span>
            ))}{' '}
            is typing
          </span>
          <TypingSvg />
        </div>
      ) : (
        <div>
          {isOnline ? (
            <span className="text-success text-sm">Online</span>
          ) : (
            <span className="text-gray-400 text-sm">Offline</span>
          )}
        </div>
      )}
    </>
  );
};
