'use client';

import React from 'react';
import ClientLayout from '@/components/ClientLayout';
import { Layout } from 'antd';
import Sidebar from '@/components/Sidebar';

const { Content, Header, Footer } = Layout;

export default function GmailAccMgmtLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar />

        <Layout>
          {/* Header */}
          <Header style={{ 
            // backgroundColor: '#001529', 
            // color: '#fff', 
            padding: '0 20px' ,
          backgroundColor: '#f0f2f5',
          color:"#000",

          }}>
            <h2 style={{ color: '#000', margin:"0" }}>Gmail Account Management</h2>
          </Header>

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
            <p>Customer Footer ©2024</p>
          </Footer>
        </Layout>
      </Layout>
    </ClientLayout>
  );
}
