import { useMemo } from 'react';
import { use100vh } from 'react-div-100vh';
import { Outlet, useParams } from 'react-router-dom';

import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import { ReactComponent as CatIcon } from 'svg/cat.svg';

import { Sidebar } from './sidebar/Sidebar';

export const Chat = () => {
  const { chatId } = useParams();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const height = use100vh();
  const chatHeight = useMemo(() => (height ? height - 90 : '100vh'), [height]); // 90px - height of header
  const isSelectedMobile = !isDesktop && chatId;

  return (
    <main
      className="container grid grid-cols-1 lg:grid-cols-[400px_auto] flex-grow"
      style={{ height: chatHeight }}
    >
      {!isSelectedMobile && <Sidebar />}
      {chatId ? (
        <Outlet />
      ) : (
        isDesktop && (
          <section className="flex flex-col justify-center items-center text-center">
            <CatIcon className="text-accentColor" />
            <h2 className="text-2xl font-bold">Pick a chat to start chatting</h2>
          </section>
        )
      )}
    </main>
  );
};
