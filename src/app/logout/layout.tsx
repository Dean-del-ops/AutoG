'use client';

import React from 'react';
import ClientLayout from '@/components/ClientLayout';
import { Layout } from 'antd';
import CustomHeader from '@/components/Header'; // Header with dynamic title

const { Content, Footer } = Layout;

export default function LogoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          {/* Custom Header */}
          <CustomHeader title="Logout" />

          {/* Main Content */}
          <Content
            style={{
              padding: '24px',
              backgroundColor: '#f0f2f5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 'calc(100vh - 112px)', // Adjust for header and footer height
            }}
          >
            {children}
          </Content>

          {/* Footer */}
          <Footer style={{ textAlign: 'center' }}>
            <p>Logout Footer ©2024</p>
          </Footer>
        </Layout>
      </Layout>
    </ClientLayout>
  );
}
