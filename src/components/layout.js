import React from 'react';
import Particles from 'react-particles-js';
import Header from './header';
import Navigater from './navigater';
import Footer from './footer'

class Layout extends React.Component {
  render () {
    const {siteMetadata, children} = this.props;
    const {title} = siteMetadata;

    return (
      <div className="layout">
          <Header title={title}/>
          <Navigater/>
          <main className="main">{children}</main>
          <Footer/>
      </div>
    );
  }
}

export default Layout;
