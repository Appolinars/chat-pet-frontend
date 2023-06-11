import { MenuItem } from '@mui/material';
import clsx from 'clsx';

import { useGetOnlineUsersQuery } from '@/store/users/usersApi.slice';

import { IUser } from '@/shared/types/user';

import avatarDefault from 'images/default-avatar.png';

interface IUsersListItem {
  user: IUser;
  onItemClick: (user: IUser) => void;
}

export const UsersListItem = ({ user, onItemClick }: IUsersListItem) => {
  const { data: onlineUsers } = useGetOnlineUsersQuery('');

  const isOnline = onlineUsers?.includes(user?._id || '');

  return (
    <MenuItem onClick={() => onItemClick(user)}>
      <div className="relative mr-3">
        <img
          className="w-12 h-12 rounded-full mr-3"
          src={user?.avatar?.url || avatarDefault}
          alt={user.username}
        />
        <span
          className={clsx(
            'inline-block w-3 h-3 rounded-full absolute top-0 right-0',
            isOnline ? 'bg-success' : 'bg-gray-400'
          )}
        />
      </div>

      <p>{user.username}</p>
    </MenuItem>
  );
};
