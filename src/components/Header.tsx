'use client';

import React from 'react';
import { Layout, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

interface HeaderProps {
  title: string;
}

const CustomHeader: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile'); // Navigate to the profile page
  };

  return (
    <Header
      style={{
        backgroundColor: '#f0f2f5',
        color: '#000',
        padding: '0 20px',
        borderBottom: '2px solid #000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: '#000', margin: '0' }}>{title}</h1>
      <Avatar
        icon={<UserOutlined />}
        style={{ cursor: 'pointer' }}
        onClick={handleProfileClick}
      />
    </Header>
  );
};

export default CustomHeader;
