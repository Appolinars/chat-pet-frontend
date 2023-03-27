import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { FC, SyntheticEvent, useState } from 'react';

import { ChatsList } from './ChatsList';
import { UsersList } from './UsersList';

type TabsTypes = 'chats' | 'users';

export const Sidebar: FC = () => {
  const [tabs, setTabs] = useState<TabsTypes>('chats');

  const handleTabChange = (e: SyntheticEvent, newValue: TabsTypes) => {
    setTabs(newValue);
  };

  return (
    <aside className="flex flex-col overflow-y-auto lg:border-r border-accentColor">
      <Tabs
        value={tabs}
        onChange={handleTabChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab label="Chats" value="chats" />
        <Tab label="Users" value="users" />
      </Tabs>
      {tabs === 'chats' && <ChatsList />}
      {tabs === 'users' && <UsersList />}
    </aside>
  );
};
