'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { resetUser } from '@/store/slices/userSlice';
import { logout } from '@/store/slices/authSlice';
import axios from '@/utils/axiosInstance';
import { message } from 'antd';
import { HttpClient } from '@/utils/axiosInstance';


const LogoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await HttpClient.POST<any>('/Users/logout');
        if (response.success) {
          // Clear token and user info
          localStorage.removeItem('token');
          dispatch(logout());
          dispatch(resetUser());
          message.success('You have successfully logged out.');
          router.push('/login'); // Redirect to login page
        } else {
          throw new Error('Logout failed');
        }
      } catch (error) {
        console.error('Logout error:', error);
        message.error('Logout failed. Please try again.');
        router.push('/dashboard'); // Redirect back to dashboard on failure
      }
    };

    performLogout();
  }, [dispatch, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Logging out...</h1>
      <p>Please wait while we process your request.</p>
    </div>
  );
};

export default LogoutPage;
