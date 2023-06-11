import { EntityId } from '@reduxjs/toolkit';
import clsx from 'clsx';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { userSelector } from '@/store/auth/auth.selectors';
import { useDeleteMessageMutation, useGetMessagesQuery } from '@/store/chat/messageApi.slice';

import { timeAgo } from '@/shared/utils/chatHelpers';

import defaultAvatar from 'images/default-avatar.png';

import { ReactComponent as DotsIcon } from 'svg/dots-horizontal.svg';

import { MessageTooltip } from './MessageTooltip';
import { useAppSelector } from '@/store';

export const Message = memo(({ id }: { id: EntityId }) => {
  const user = useAppSelector(userSelector);
  const { chatId } = useParams();
  const { message } = useGetMessagesQuery(chatId || '', {
    selectFromResult: ({ data }) => ({ message: data?.entities[id] }),
  });
  const [deleteMessage] = useDeleteMessageMutation();

  const isMineMessage = message?.sender._id === user?._id;

  return message ? (
    <div
      className={clsx('w-full flex', {
        'justify-end': isMineMessage,
      })}
    >
      <div className="flex flex-col max-w-sm">
        <div
          className={clsx('flex items-end relative', {
            'justify-end': isMineMessage,
          })}
        >
          {!isMineMessage && (
            <img
              className="w-8 h-8 rounded-full mr-2"
              src={message.sender?.avatar?.url || defaultAvatar}
              alt="Avatar"
            />
          )}
          {/* <button
            onClick={() => {
              deleteMessage({
                messageId: `${id}`,
                chatId: chatId || '',
              });
            }}
          >
            DELETE
          </button> */}
          <p className={clsx('p-3 rounded-lg', isMineMessage ? 'bg-slate-600' : 'bg-slate-800')}>
            {message.content}
          </p>
          <MessageTooltip message={message} />
        </div>
        <span className="self-end text-xs opacity-70">{timeAgo(message.createdAt)}</span>
      </div>
    </div>
  ) : null;
});
