import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import Navigater from './navigater';

const { Header, Sider, Content } = Layout;

// import Header from './header';
// import Footer from './footer'

class Page extends React.Component {
  state = {
    collapsed: false,
  };


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { siteMetadata, children } = this.props;
    const { title } = siteMetadata;
    const { collapsed } = this.state;

    return (
      <Layout  style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className="logo" />
        <Navigater/>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
    );
  }
}

{/* <div className="layout">
<Header title={title}/>
<Navigater/>
<main className="main">{children}</main>
<Footer/>
</div> */}

export default Page;
