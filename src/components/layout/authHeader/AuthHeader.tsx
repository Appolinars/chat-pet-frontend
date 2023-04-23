import { Notifications } from './Notifications';
import { Menu, MenuItem } from '@mui/material';
import { FC, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useLogoutMutation } from '@/store/auth/authApiSlice';
import { userSelector } from '@/store/auth/authSelectors';

import defaultImage from 'images/default-avatar.png';

import { ReactComponent as LogoutIcon } from 'svg/logout.svg';
import { ReactComponent as SettingsIcon } from 'svg/settings.svg';

import { ChatIcon } from './ChatIcon';
import { useAppSelector } from '@/store';

export const AuthHeader: FC = () => {
  const user = useAppSelector(userSelector);
  const [logout] = useLogoutMutation();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const imgRef = useRef(null);

  const handleLogout = async () => {
    setIsMenuActive(false);
    await logout('');
  };

  return (
    <header className="border-b border-accentColor py-2">
      <div className="container flex justify-between items-center">
        <Link to="/chat">
          <ChatIcon />
        </Link>
        <div className="flex items-center">
          <Notifications />
          <button className="ml-4" ref={imgRef} onClick={() => setIsMenuActive(true)}>
            <img
              className="w-12 h-12 rounded-full"
              src={user?.avatar?.url || defaultImage}
              alt="User's avatar"
            />
          </button>
          <Menu
            anchorEl={imgRef.current}
            open={isMenuActive}
            onClose={() => setIsMenuActive(false)}
          >
            <MenuItem>
              <Link
                className="flex items-center"
                to="/settings"
                onClick={() => setIsMenuActive(false)}
              >
                <SettingsIcon className="mr-1" /> Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <button className="flex items-center" onClick={handleLogout}>
                <LogoutIcon className="mr-1" /> Loggout
              </button>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};
