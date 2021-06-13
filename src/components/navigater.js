import { Link } from "gatsby";
import React from 'react';
import { Menu } from 'antd';
import {
  FileMarkdownOutlined,
  UserOutlined,
} from '@ant-design/icons';

export default () => {
  const dataSource = [
    { name: "首页", to: "/post/page/1", icon: <FileMarkdownOutlined /> },
    { name: "关于我", to: "/about", icon: <UserOutlined /> },
  ]
  const list = dataSource.map((item, index) => <Menu.Item key={index} icon={item.icon}>
    <Link to={item.to}>{item.name}</Link>
  </Menu.Item>);
  const defaultSelectedKeys = dataSource.findIndex((item) => item.to == window.location.pathname) || 0;
  return <Menu mode="inline" defaultSelectedKeys={[`${defaultSelectedKeys}`]}>
    {list}
  </Menu>;
}