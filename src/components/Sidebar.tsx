'use client';

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { MenuItem } from '@/utils/menuConfig';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const menu = useSelector((state: RootState) => state.menu.menu);

  const handleMenuClick = (key: string) => {
    if (key === 'network') {
    //   router.push('/network/customer'); 
    } else {
      router.push(`/${key}`);
    }
  };



  const renderMenuItems = (menuItems: MenuItem[]) => {
    return menuItems.map((item) => {
      const IconComponent = item.icon; // Assign icon function to a variable

      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={item.key}
            icon={IconComponent ? IconComponent : null} // Safely render the icon
            title={item.label}
            onTitleClick={() => handleMenuClick(item.url)}
          >
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item 
        key={item.key} 
        icon={IconComponent ? IconComponent : null}
        onClick={() => handleMenuClick(item.url)}
        >
          {item.label}
        </Menu.Item>
      );
    });
  };

  return (
    <Sider  
    collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    width={200} style={{ backgroundColor: '#001529', paddingTop:"0px" }}>
        <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#002140',
          color: '#fff',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        <img
          src="https://cdn.dribbble.com/users/445066/screenshots/3176562/attachments/675758/inventory_management_app_icon_2_2x.png"
          alt="App Icon"
          style={{ height: '40px', marginRight: '10px' }}
        />
        {!collapsed && 
        <span>AppName</span>
        }
      </div>
      <Menu theme="dark" mode="inline">
        {renderMenuItems(menu)}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
