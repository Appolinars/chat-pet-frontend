import { CircularProgress, TextareaAutosize } from '@mui/material';
import { EmojiClickData } from 'emoji-picker-react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '@/providers/SocketProvider';

import { userSelector } from '@/store/auth/auth.selectors';
import { useSendMessageMutation } from '@/store/chat/messageApi.slice';

import { ReactComponent as SendIcon } from 'svg/send.svg';

import { ChatEmojiPicker } from './ChatEmojiPicker';
import { useAppSelector } from '@/store';

let typingTimeout: string | number | NodeJS.Timeout | undefined;

export const DialogFooter = () => {
  const { chatId } = useParams();
  const user = useAppSelector(userSelector);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [newMessage, setNewMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, []);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

    if (e.target.value.length === 0) {
      // User has stopped typing
      clearTimeout(typingTimeout);
      typingTimeout = undefined;
      if (isTyping) {
        socket.emit('USER_STOPED_TYPING', { chatId, user });
        setIsTyping(false);
      }
    } else {
      // User is typing
      if (!isTyping) {
        socket.emit('USER_TYPING', { chatId, user });
        setIsTyping(true);
      }

      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      typingTimeout = setTimeout(() => {
        socket.emit('USER_STOPED_TYPING', { chatId, user });
        setIsTyping(false);
        typingTimeout = undefined;
      }, 5000);
    }
  };

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

  return (
    <footer className="flex items-center py-6 pl-3 pr-1 border-t border-accentColor">
      <div className="relative w-full">
        <TextareaAutosize
          className="w-full border bg-slate-900 border-slate-900 transition-shadow shadow-transparent focus:shadow-primary hover:shadow-primary py-3 pl-3 pr-10 mr-4 rounded-xl resize-none outline-none custom-scrollbar"
          value={newMessage}
          onChange={handleMessageChange}
          minRows={1}
          maxRows={2}
          placeholder="Enter your message"
          ref={textareaRef}
          maxLength={700}
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
  );
};
