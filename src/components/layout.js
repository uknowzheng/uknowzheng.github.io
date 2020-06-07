import React from "react"
import { Link } from "gatsby"
import Particles from "react-particles-js"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children, social } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const pagePath = `${__PATH_PREFIX__}/page/`
    let header

    if (
      location.pathname === rootPath ||
      ~location.pathname.indexOf(pagePath)
    ) {
      header = (
        <h1
          style={{
            ...scale(1),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h5
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {`<< 返回主页`}
          </Link>
        </h5>
      )
    }
    return (
      <div>
        <Particles
          style={{ position: "absolute", indexZ: -1 }}
          params={{
            particles: {
              number: {
                value: 50,
              },
              size: {
                value: 3,
              },
              color: {
                value: "#000",
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
          }}
        />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            width: rhythm(36),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            position: "relative",
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href={`https://github.com/${social.github}`}>uknowzheng</a>
          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
