import { CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '@/providers/SocketProvider';

import { useGetMessagesQuery } from '@/store/chat/messageApi.slice';

import { DialogFooter } from './DialogFooter';
import { DialogHeader } from './DialogHeader';
import { Message } from './Message';

export const Dialog = () => {
  const { chatId } = useParams();

  const { data: messagesList, isLoading } = useGetMessagesQuery(chatId || '');
  const scrollDiv = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollDiv.current?.scrollIntoView({
      block: 'end',
    });
  };

  useEffect(() => {
    socket.emit('JOIN_CHAT', chatId);
  }, []);

  useEffect(() => {
    setTimeout(scrollToBottom, 300);
    if (messagesList && messagesList?.ids.length > 0) {
      scrollToBottom();
    }
  }, [messagesList]);

  const isEmptyMessages = !isLoading && messagesList?.ids?.length === 0;

  return (
    <div className="flex flex-col justify-end overflow-hidden">
      <DialogHeader />
      {isLoading && (
        <div className="flex justify-center items-center flex-grow text-accentColor">
          <CircularProgress color="inherit" size={50} />
        </div>
      )}
      {isEmptyMessages ? (
        <div className="flex justify-center items-center flex-grow text-2xl text-center">
          <p>Start chatting by typing your first message!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-start p-3 overflow-y-auto custom-scrollbar flex-grow">
          {messagesList?.ids.map((messageId) => (
            <Message key={messageId} id={messageId} />
          ))}
          <div ref={scrollDiv} />
        </div>
      )}
      <DialogFooter />
    </div>
  );
};
