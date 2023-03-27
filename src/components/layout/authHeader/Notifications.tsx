import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import { FC, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as BellIcon } from 'svg/bell.svg';

const notifications = [
  {
    text: 'You have messages from John Smith',
    chatId: 1,
  },
  {
    text: 'You have messages from John Smith',
    chatId: 2,
  },
];

export const Notifications: FC = () => {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const bellRef = useRef(null);
  return (
    <>
      <IconButton ref={bellRef} onClick={() => setIsMenuActive(true)}>
        <Badge badgeContent={notifications.length} color="secondary">
          <BellIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={bellRef.current} open={isMenuActive} onClose={() => setIsMenuActive(false)}>
        {notifications.map((item) => (
          <MenuItem key={item.chatId}>
            <Link to={`/chat/${item.chatId}`}>{item.text}</Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
