import React, { Component } from "react"
import { List, Avatar, Space } from "antd"
import { Link, navigate } from "gatsby"
import { FileMarkdownOutlined } from "@ant-design/icons"

export default ({ dataSource, pagination }) => {
  const { current, total, pageSize } = pagination
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          if (typeof window !== `undefined`) {
            navigate("/post/page/" + page)
          }
        },
        showTotal: total => `总共 ${total} 篇文章`,
        current,
        pageSize,
        total,
        defaultCurrent: current,
        defaultPageSize: pageSize,
      }}
      dataSource={dataSource}
      renderItem={({ node }) => {
        const { title, slug, date } = node.frontmatter
        return (
          <List.Item key={slug}>
            <List.Item.Meta
              avatar={<Avatar icon={<FileMarkdownOutlined />} />}
              title={<Link to={`/post/${date}/${slug}`}>{title}</Link>}
              description={date}
            />
          </List.Item>
        )
      }}
    />
  )
}
