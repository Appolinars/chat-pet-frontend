import { CircularProgress, MenuList } from '@mui/material';

import { useGetChatsQuery } from '@/store/chat/chatApi.slice';

import { ChatsListItem } from './ChatsListItem';

export const ChatsList = () => {
  const { data: chatsList, isLoading } = useGetChatsQuery('');

  return (
    <div className="flex flex-col py-3 overflow-hidden">
      <h1 className="text-2xl mb-6">My Chats</h1>
      {isLoading && (
        <div className="flex justify-center text-accentColor">
          <CircularProgress color="inherit" size={50} />
        </div>
      )}
      {chatsList && (
        <MenuList className="h-full overflow-y-auto custom-scrollbar">
          {chatsList?.map((chat) => (
            <ChatsListItem chat={chat} key={chat._id} />
          ))}
        </MenuList>
      )}
    </div>
  );
};
