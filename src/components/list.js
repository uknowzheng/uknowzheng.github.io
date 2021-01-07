import React, { Component } from 'react'
import { List, Avatar, Space } from 'antd';

export default ({ list }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 7,
      }}
      dataSource={list}
      footer={
        <div>
          <b>ant design</b> footer part
      </div>
      }
      renderItem={({node}) => {
        const title = node.frontmatter.title || node.fields.slug;
        const dateStr = node.frontmatter.dateStr;
        return <List.Item
          key={node.fields.slug}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
            title={<a href={"https://ant.design"}>{title}</a>}
            description={dateStr}
          />
          {dateStr}
        </List.Item>;
      }}
    />
  );
}
