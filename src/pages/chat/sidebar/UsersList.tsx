import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  MenuList,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateChatMutation } from '@/store/chat/chatApi.slice';
import { useGetUsersQuery } from '@/store/users/usersApi.slice';

import { IUser } from '@/shared/types/user';

import avatarDefault from 'images/default-avatar.png';

export const UsersList = () => {
  const navigate = useNavigate();
  const { data: usersList, isLoading } = useGetUsersQuery('');
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [createChat] = useCreateChatMutation();

  const openModal = (user: IUser) => {
    setSelectedUser(user);
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const handleCreateChat = async () => {
    await createChat({ partnerId: selectedUser?._id || '', navigate });
    closeModal();
  };

  return (
    <>
      <div className="flex flex-col py-3 overflow-hidden">
        <h1 className="text-2xl mb-6">Users list</h1>
        {isLoading && (
          <div className="flex justify-center text-accentColor">
            <CircularProgress color="inherit" size={50} />
          </div>
        )}
        {usersList && (
          <MenuList className="h-full overflow-y-auto custom-scrollbar">
            {usersList.map((user) => (
              <MenuItem key={user._id} onClick={() => openModal(user)}>
                <img
                  className="w-12 h-12 rounded-full mr-3"
                  src={user?.avatar?.url || avatarDefault}
                  alt={user.username}
                />
                <p>{user.username}</p>
              </MenuItem>
            ))}
          </MenuList>
        )}
      </div>
      <Dialog
        open={isModalActive}
        onClose={closeModal}
        TransitionProps={{
          onExited() {
            setSelectedUser(null);
          },
        }}
      >
        <DialogTitle>Create dialog with user:</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedUser?.username}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleCreateChat}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
