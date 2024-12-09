'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, message } from 'antd';
import { Form, Input, Button, Typography } from 'antd';
import { HttpClient } from '@/utils/axiosInstance';
import { useToast } from '@/components/ToastContext';

const { Title } = Typography;

export default function RegisterPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { name, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
        showToast("error","Passwords do not match!");
        return;
    }

    setLoading(true);
    try {
      console.log("Registering user with:", { name, email, password });
      const response = await HttpClient.POST<any>('/Users/register', { username:name, passwordHash:password,phoneNumber: email, role:"admin" },{ headers: { useAuth: false } });
    console.log(response,"responsedata")
    if(response.success){
      showToast('success', 'Registration successful!');
      router.push("/login");
    }
    } catch (error) {
      console.error("Registration error:", error);
      showToast('error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        showToast('error', 'Registration failed. Please try again.');
    }, 100); // Delay ensures proper rendering context

    return () => clearTimeout(timer); // Clean up timeout
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
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
      <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Register
      </Title>
      <Form
        name="register"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{}}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            // { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Enter your phone" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password' }]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ marginTop: '16px' }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>
        Already have an account? <a href="/login">Login</a>
      </Typography.Text>
    </Card>
    </div>
  );
}
