import { Link } from 'gatsby';
import React from 'react';
import { Menu } from 'antd';
export default () => {
  const dataSource = [{ name: "首页", to: "/" }, { name: "关于我", to: "/about" }];
  const list = dataSource.map((item, index) => <Menu.Item key={index} >
    <Link to={item.to}>{item.name}</Link>
  </Menu.Item>);
  const defaultSelectedKeys = dataSource.findIndex((item) => item.to == window.location.pathname)
  return <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${defaultSelectedKeys}`]}>
    {list}
  </Menu>;
}