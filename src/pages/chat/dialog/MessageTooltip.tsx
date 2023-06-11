import { Menu, MenuItem } from '@mui/material';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { userSelector } from '@/store/auth/auth.selectors';
import { useDeleteMessageMutation } from '@/store/chat/messageApi.slice';

import { IMessage } from '@/shared/types/chat';

import { ReactComponent as DotsIcon } from 'svg/dots-horizontal.svg';

import { useAppSelector } from '@/store';

interface IMessageTooltip {
  message: IMessage;
}

export const MessageTooltip = ({ message }: IMessageTooltip) => {
  const user = useAppSelector(userSelector);
  const { chatId } = useParams();

  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

  const tooltipBtnRef = useRef(null);

  const handleDelete = () => {
    deleteMessage({
      messageId: message._id,
      chatId: chatId || '',
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setIsMenuActive(false);
  };

  const isMineMessage = message?.sender._id === user?._id;

  return (
    <>
      <button
        className={clsx(
          'absolute top-1/2 -translate-y-1/2 group',
          isMineMessage ? '-left-7' : '-right-7'
        )}
        ref={tooltipBtnRef}
        onClick={() => setIsMenuActive(true)}
      >
        <DotsIcon className="text-slate-500 group-hover:text-current transition-colors" />
      </button>
      <Menu
        anchorEl={tooltipBtnRef.current}
        open={isMenuActive}
        onClose={() => setIsMenuActive(false)}
      >
        <MenuItem
          sx={{
            fontSize: '14px',
          }}
        >
          <button onClick={handleCopy}>Copy</button>
        </MenuItem>
        {isMineMessage && (
          <MenuItem
            sx={{
              fontSize: '14px',
            }}
          >
            <button onClick={handleDelete} disabled={isDeleting}>
              Delete
            </button>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
