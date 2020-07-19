import React from 'react';
import {Link} from 'gatsby';
import Particles from 'react-particles-js';

import {rhythm, scale} from '../utils/typography';

class Layout extends React.Component {
  render () {
    const {siteMetadata, children} = this.props;
    const {title, subTitle, social} = siteMetadata;

    return (
      <div className="layout">
        <Particles
          style={{position: 'absolute', indexZ: -1}}
          params={{
            particles: {
              number: {
                value: 50,
              },
              size: {
                value: 3,
              },
              color: {
                value: '#000',
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: 'repulse',
                },
              },
            },
          }}
        />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            width: rhythm (36),
            padding: `${rhythm (1.5)} ${rhythm (3 / 4)}`,
            position: 'relative',
          }}
        >
          <header>
            <h1
              style={{
                ...scale (1),
                marginBottom: 0,
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
            <p  style={{
                marginBottom: 0,
                marginTop: 0,
              }}>{subTitle}</p>
          </header>
          <nav>｜ <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                首页
              </Link> ｜ <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/about`}
              >
                关于我
              </Link> ｜</nav>
          <main className="main">{children}</main>
          <footer>
            {`© ${new Date ().getFullYear ()}, Built with uknowzheng`}
          </footer>
        </div>
      </div>
    );
  }
}

export default Layout;
