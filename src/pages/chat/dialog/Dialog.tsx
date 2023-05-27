import { CircularProgress, TextareaAutosize } from '@mui/material';
import { EmojiClickData } from 'emoji-picker-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetMessagesQuery, useSendMessageMutation } from '@/store/chat/messageApi.slice';

import { ReactComponent as SendIcon } from 'svg/send.svg';

import { ChatEmojiPicker } from './ChatEmojiPicker';
import { Message } from './Message';

export const Dialog = () => {
  const { chatId } = useParams();

  const { data: messagesList, isLoading } = useGetMessagesQuery(chatId || '');
  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  const [newMessage, setNewMessage] = useState<string>('');

  const scrollDiv = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    scrollDiv.current?.scrollIntoView({
      block: 'start',
    });
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messagesList, textareaRef.current?.offsetHeight]);

  const handleEmojiClick = useCallback((emoji: EmojiClickData) => {
    setNewMessage((prev) => `${prev} ${emoji.emoji}`);
  }, []);

  const handleSendMessage = async () => {
    await sendMessage({
      chatId: chatId || '',
      content: newMessage,
    });
    setNewMessage('');
    textareaRef.current?.focus();
  };

  const isEmptyMessages = !isLoading && messagesList?.ids?.length === 0;

  return (
    <div className="flex flex-col justify-end overflow-hidden">
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
        <div className="flex flex-col gap-6 items-start p-3 overflow-y-auto custom-scrollbar">
          {messagesList?.ids.map((messageId) => (
            <Message key={messageId} id={messageId} />
          ))}
          <div ref={scrollDiv} />
        </div>
      )}

      <footer className="flex items-center py-6 pl-3 pr-1 border-t border-accentColor">
        <div className="relative w-full">
          <TextareaAutosize
            className="w-full border bg-slate-900 border-slate-900 transition-shadow shadow-transparent focus:shadow-primary hover:shadow-primary py-3 pl-3 pr-10 mr-4 rounded-xl resize-none outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            minRows={1}
            maxRows={4}
            placeholder="Enter your message"
            ref={textareaRef}
          />
          <ChatEmojiPicker onEmojiClick={handleEmojiClick} />
        </div>

        <button
          className="flex items-center justify-center rounded-lg w-9 h-9 ml-3 hover:text-accentColor transition-bg"
          onClick={handleSendMessage}
          disabled={isSendingMessage}
        >
          {isSendingMessage ? <CircularProgress color="inherit" size={20} /> : <SendIcon />}
        </button>
      </footer>
    </div>
  );
};
