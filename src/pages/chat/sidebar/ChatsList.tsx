import { Badge, MenuItem, MenuList } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import defaultAvatar from 'images/default-avatar.png';

const chats = [
  {
    id: 123,
    username: 'John Doe',
    messagesCount: 1,
    lastMessage: 'Hello. How are you?',
    time: '3hrs ago',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
  {
    id: 222,
    username: 'Alisa Johnson',
    messagesCount: 7,
    lastMessage: 'Where have you been?',
    time: 'Yesterday',
  },
];

export const ChatsList: FC = () => {
  return (
    <div className="flex flex-col py-3 overflow-hidden">
      <h1 className="text-2xl mb-6">My Chats</h1>
      <MenuList className="h-full overflow-y-auto custom-scrollbar">
        {chats.map((chat) => (
          <MenuItem key={chat.id} sx={{ padding: '0' }}>
            <Link
              className="flex items-center w-full py-3 px-4 border-b border-accentColor"
              to={`/chat/${chat.id}`}
            >
              <div className="relative mr-3">
                <img className="w-12 h-12 rounded-full" src={defaultAvatar} alt="Avatar" />
                <span className="inline-block w-3 h-3 rounded-full bg-success absolute top-0 right-0" />
              </div>
              <div className="flex flex-col grow">
                <span className="flex justify-between mb-2">
                  <span>{chat.username}</span>
                  <Badge
                    badgeContent={chat.messagesCount}
                    sx={{
                      '& .MuiBadge-badge': {
                        transform: 'none',
                        position: 'static',
                      },
                    }}
                    color="secondary"
                  />
                </span>
                <span className="flex justify-between text-sm">
                  <span>{chat.lastMessage}</span>
                  <span className="opacity-70">{chat.time}</span>
                </span>
              </div>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );
};
