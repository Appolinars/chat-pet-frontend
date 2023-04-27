import { Badge, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

import { IChat } from '@/shared/types/chat';

import defaultAvatar from 'images/default-avatar.png';

interface IChatsListItem {
  chat: IChat;
}

export const ChatsListItem = ({ chat }: IChatsListItem) => {
  return (
    <MenuItem sx={{ padding: '0' }}>
      <Link
        className="flex items-center w-full py-3 px-4 border-b border-accentColor"
        to={`/chat/${chat._id}`}
      >
        <div className="relative mr-3">
          <img className="w-12 h-12 rounded-full" src={defaultAvatar} alt="Avatar" />
          <span className="inline-block w-3 h-3 rounded-full bg-success absolute top-0 right-0" />
        </div>
        <div className="flex flex-col grow">
          <span className="flex justify-between mb-2">
            <span>{chat.users[0].username}</span>
            <Badge
              badgeContent={2}
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
            <span>{chat.latestMessage.content}</span>
            <span className="opacity-70">{chat.updatedAt}</span>
          </span>
        </div>
      </Link>
    </MenuItem>
  );
};
