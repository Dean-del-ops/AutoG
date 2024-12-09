'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hook';
import { login } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { Typography, Input, Button, Card, Space } from 'antd';
import { setMenu } from '@/store/slices/menuSlice';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    await dispatch(login(email, password) as any);
    dispatch(setMenu(["admin"]))
    if (isAuthenticated) {
      router.push('/dashboard'); // Redirect to dashboard after login
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '88vh',
        background: 'linear-gradient(to right, #d9e7ff, #ffffff)', // Light gradient background
      }}
    >
      <Card
        style={{
          width: '600px',
          borderRadius: '8px',
          // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Title level={3}>Login to Your Account</Title>
        <Text type="secondary">Automation Bot</Text>
        <Space
          direction="vertical"
          style={{
            width: '100%',
            marginTop: '24px',
          }}
        >
          <Input
            placeholder="Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size='large'
          />
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size='large'
          />
          <Button
            type="primary"
            onClick={handleLogin}
            loading={loading}
            block
            style={{
              height: '48px',
              fontSize: '16px',
            }}
          >
            Login
          </Button>
        </Space>
        <Text
          type="secondary"
          style={{
            display: 'block',
            marginTop: '16px',
          }}
        >
          Don't have an account? <a href="/register">Sign up here</a>
        </Text>
      </Card>
    </div>
  );
}
