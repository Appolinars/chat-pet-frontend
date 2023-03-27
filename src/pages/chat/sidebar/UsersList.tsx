import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  MenuList,
} from '@mui/material';
import { FC, useState } from 'react';

import avatar from 'images/default-avatar.png';

const users = [
  {
    id: 1,
    username: 'John Doe',
    avatar: avatar,
  },
  {
    id: 2,
    username: 'Max Doe',
    avatar: avatar,
  },
  {
    id: 3,
    username: 'Mick Doe',
    avatar: avatar,
  },
  {
    id: 1,
    username: 'John Doe',
    avatar: avatar,
  },
  {
    id: 2,
    username: 'Max Doe',
    avatar: avatar,
  },
  {
    id: 3,
    username: 'Mick Doe',
    avatar: avatar,
  },
  {
    id: 1,
    username: 'John Doe',
    avatar: avatar,
  },
  {
    id: 2,
    username: 'Max Doe',
    avatar: avatar,
  },
  {
    id: 3,
    username: 'Mick Doe',
    avatar: avatar,
  },
  {
    id: 1,
    username: 'John Doe',
    avatar: avatar,
  },
  {
    id: 2,
    username: 'Max Doe',
    avatar: avatar,
  },
  {
    id: 3,
    username: 'Mick Doe',
    avatar: avatar,
  },
  {
    id: 1,
    username: 'John Doe',
    avatar: avatar,
  },
  {
    id: 2,
    username: 'Max Doe',
    avatar: avatar,
  },
  {
    id: 3,
    username: 'Mick Doe',
    avatar: avatar,
  },
];

export const UsersList: FC = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const toggleModal = () => {
    setIsModalActive((prev) => !prev);
  };
  return (
    <>
      <div className="flex flex-col py-3 overflow-hidden">
        <h1 className="text-2xl mb-6">Users list</h1>
        <MenuList className="h-full overflow-y-auto custom-scrollbar">
          {users.map((user) => (
            <MenuItem key={user.id} onClick={toggleModal}>
              <img className="w-12 h-12 rounded-full mr-3" src={user.avatar} alt={user.username} />
              <p>{user.username}</p>
            </MenuItem>
          ))}
        </MenuList>
      </div>
      <Dialog open={isModalActive} onClose={toggleModal}>
        <DialogTitle>Create dialog with user:</DialogTitle>
        <DialogContent>
          <DialogContentText>John Doe</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal}>Cancel</Button>
          <Button onClick={toggleModal}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
