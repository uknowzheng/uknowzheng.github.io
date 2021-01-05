import React from 'react';
import { scale } from '../utils/typography';
import { Link } from 'gatsby';
export default (props) => {
  const { title } = props;
  return <header>
    <h1
      style={{
        ...scale(1),
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
  </header>;
}