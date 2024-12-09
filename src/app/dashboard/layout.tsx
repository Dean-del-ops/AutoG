'use client';

import React from 'react';
import ClientLayout from '@/components/ClientLayout';
import { Layout } from 'antd';
import Sidebar from '@/components/Sidebar'; // Adjust the path to your Sidebar component
import CustomHeader from '@/components/Header';

const { Content, Header, Footer } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar />

        <Layout>
          {/* Header */}
          <CustomHeader title="Dashboard" />

          {/* Main Content */}
          <Content
            style={{
              padding: '24px',
              backgroundColor: '#f0f2f5',
            }}
          >
            {children}
          </Content>

          {/* Footer */}
          <Footer style={{ textAlign: 'center' }}>
            <p>Dashboard Footer ©2024</p>
          </Footer>
        </Layout>
      </Layout>
    </ClientLayout>
  );
}
