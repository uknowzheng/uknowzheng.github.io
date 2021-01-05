import { Link } from 'gatsby';
import React from 'react';
export default () => {
  return <nav>｜ <Link
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
</Link> ｜</nav>;
}