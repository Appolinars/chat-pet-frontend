import { TextareaAutosize } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { ReactComponent as SendIcon } from 'svg/send.svg';

import { Message } from './Message';

export const Dialog = () => {
  const [messages, setMessages] = useState([
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, amet.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui laborum minima dolorem at cumque? Iure cum earum nisi ex quos?',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, amet.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui laborum minima dolorem at cumque? Iure cum earum nisi ex quos?',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, amet.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui laborum minima dolorem at cumque? Iure cum earum nisi ex quos?',
  ]);
  const [newMessage, setNewMessage] = useState('');

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
  }, [messages, textareaRef.current?.offsetHeight]);

  return (
    <div className="flex flex-col justify-end overflow-hidden">
      <div className="flex flex-col gap-6 items-start p-3 overflow-y-auto custom-scrollbar">
        {messages.map((message) => (
          <Message text={message} />
        ))}
        <div ref={scrollDiv} />
      </div>

      <footer className="flex items-center py-6 px-3 border-t border-accentColor">
        <TextareaAutosize
          className="w-full border bg-slate-900 border-slate-900 transition-shadow shadow-transparent focus:shadow-primary hover:shadow-primary p-3 mr-4 rounded-xl resize-none outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          minRows={1}
          maxRows={4}
          placeholder="Enter your message"
          ref={textareaRef}
        />
        <button
          className="flex items-center justify-center rounded-lg w-9 h-9 hover:text-accentColor transition-bg"
          onClick={() => {
            setMessages((prev) => [...prev, newMessage]);
            setNewMessage('');
            textareaRef.current?.focus();
          }}
        >
          <SendIcon />
        </button>
      </footer>
    </div>
  );
};
