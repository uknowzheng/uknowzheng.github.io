import React from "react"
import { Layout } from "antd"
import Navigater from "./navigater"
import Logo from "./logo"
import "./page-layout.less"

const { Header, Sider, Content } = Layout

class Page extends React.Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    const { siteMetadata, children } = this.props
    // const { title } = siteMetadata;
    const { collapsed } = this.state

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <Logo toggleFunc={this.toggle} collapsed={this.state.collapsed} />
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            Sider
            width={200}
            className="site-layout-background"
          >
            <Navigater />
          </Sider>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

{
  /* <div className="layout">
<Header title={title}/>
<Navigater/>
<main className="main">{children}</main>
<Footer/>
</div> */
}

export default Page
