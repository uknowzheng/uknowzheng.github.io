import React, { Component } from 'react'
import { List, Avatar, Space } from 'antd';
import { Link } from 'gatsby';
import {
  FileMarkdownOutlined
} from '@ant-design/icons';

export default ({ dataSource, pagination }) => {
  const { currentPage, pageScore } = pagination;
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        current: currentPage,
        pageSize: 10,
        defaultCurrent: currentPage,
        defaultPageSize: 10
      }}
      dataSource={dataSource}
      renderItem={({ node }) => {
        const { title, slug, date } = node.frontmatter;
        return <List.Item
          key={slug}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<FileMarkdownOutlined />} />}
            title={<Link to={`/post/${date}/${slug}`}>
              {title}
            </Link>}
            description={date}
          />
        </List.Item>;
      }}
    />
  );
}
