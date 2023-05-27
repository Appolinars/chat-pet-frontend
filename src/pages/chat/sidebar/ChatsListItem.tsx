import { Badge, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

import { userSelector } from '@/store/auth/auth.selectors';

import { IChat } from '@/shared/types/chat';
import { cropString } from '@/shared/utils';
import { getPartner, timeAgo } from '@/shared/utils/chatHelpers';

import defaultAvatar from 'images/default-avatar.png';

import { useAppSelector } from '@/store';

interface IChatsListItem {
  chat: IChat;
}

export const ChatsListItem = ({ chat }: IChatsListItem) => {
  const user = useAppSelector(userSelector);

  const chatPartner = getPartner(user?._id || '', chat.users);
  const isLatestMine = chat?.latestMessage?.sender._id === user?._id;
  const latestMessage = cropString(chat?.latestMessage?.content, 12);

  return (
    <MenuItem sx={{ padding: '0' }}>
      <Link
        className="flex items-center w-full py-3 px-4 border-b border-accentColor"
        to={`/chat/${chat._id}`}
      >
        <div className="relative mr-3 shrink-0">
          <img
            className="w-12 h-12 rounded-full"
            src={chatPartner?.avatar?.url || defaultAvatar}
            alt="Avatar"
          />
          <span className="inline-block w-3 h-3 rounded-full bg-success absolute top-0 right-0" />
        </div>
        <div className="flex flex-col grow">
          <span className="flex justify-between mb-2">
            <span>{chatPartner.username}</span>
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
            {latestMessage ? (
              <span className="truncate">
                {isLatestMine ? `You: ${latestMessage}` : latestMessage}
              </span>
            ) : (
              <span>No messages</span>
            )}

            <span className="opacity-70">{timeAgo(chat?.latestMessage?.createdAt)}</span>
          </span>
        </div>
      </Link>
    </MenuItem>
  );
};
