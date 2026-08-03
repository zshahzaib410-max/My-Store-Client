
import React, { useState } from 'react';
import { items } from './sidebarItems';
import { Breadcrumb, Button, Layout, Menu, theme, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import DashBoardRoutes from './DashBoardRoutes';
import { useAuth } from '@/context/AuthContext';
const { Header, Content, Footer, Sider } = Layout;

const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate=useNavigate()

  // const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

  const currentYear = new Date().getFullYear();

  const { handleDelete, user } = useAuth()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible breakpoint='lg' collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo">
          <Typography.Title level={3} className="logo-text">
            <Link to="/" className="text-decoration-none">  NB Store </Link> 
            </Typography.Title>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items.filter(item => !item.allowedroles || item.allowedroles.includes(user.role))} />
      </Sider>
      <Layout>
        <Header className="dashboard-header">

          <div className="header-right">

            <span className="welcome"> Welcome, {user?.fullName} </span>

            <Button type="primary" danger onClick={handleDelete} > Logout </Button>
            <Button type="primary"  onClick={() => { navigate( '/' ) }} > Home </Button>

          </div>

        </Header>
        <Content className="dashboard-content">
          <div className="content-box">
             <DashBoardRoutes />
              </div>
        </Content>
        <Footer className="dashboard-footer">
          NB Store © {currentYear} | Developed by Noor Zaman
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashBoard;