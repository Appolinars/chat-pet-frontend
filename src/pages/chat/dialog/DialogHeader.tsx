import { useParams } from 'react-router-dom';

import { userSelector } from '@/store/auth/auth.selectors';
import { useFetchChatQuery } from '@/store/chat/chatApi.slice';

import { getPartner } from '@/shared/utils/chatHelpers';

import { DialogHeaderInfo } from './DialogHeaderInfo';
import { useAppSelector } from '@/store';

export const DialogHeader = () => {
  const { chatId } = useParams();
  const user = useAppSelector(userSelector);

  const { data: chatData } = useFetchChatQuery(chatId || '');

  const chatPartner = getPartner(user?._id, chatData?.users);

  return (
    <>
      {chatData && (
        <header className="p-2 md:p-3 border-b border-accentColor relative z-1">
          <p>{chatPartner?.username}</p>
          <DialogHeaderInfo chat={chatData} />
        </header>
      )}
    </>
  );
};
