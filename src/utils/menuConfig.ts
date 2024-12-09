import React from 'react';

  
  export interface MenuItem {
    key: string;
    label: string;
    icon: React.ReactNode;
    roles: string[]; // Roles that can access this menu
    children?: MenuItem[]; // Optional submenus
    url:string
  }

  import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    FileOutlined,
  } from '@/components/IconComponents'; 
  
  export const menuConfig: MenuItem[] = [
    // {
    //   key: 'dashboard',
    //   label: 'Home ICON',
    //   icon: DashboardOutlined(),
    //   roles: ['admin', 'supplier', 'manager'],
    // },
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: DashboardOutlined(),
      roles: ['admin', 'supplier', 'manager'],
      url: 'dashboard'
    },
    {
      key: 'network',
      label: 'Network Management',
      icon: UserOutlined(),
      roles: ['admin'],
      url: 'network',
      children: [
        {
          key: 'gmailaccount',
          label: 'Gamil Account Management',
          icon: FileOutlined(),
          roles: ['admin'],
          url: 'network/gmailaccount',
        },
        {
          key: 'emaillist',
          label: 'Email List Management',
          icon: FileOutlined(),
          roles: ['admin'],
          url: 'network/emaillist',
        },
      ],
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: SettingOutlined(),
      roles: ['admin', 'manager'],
      url: 'settings',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: LogoutOutlined(),
      roles: ['admin', 'supplier', 'manager'],
      url: 'logout',
    },
  ];
  