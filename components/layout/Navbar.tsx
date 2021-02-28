import Link from 'next/link';
import React from 'react';

const Navbar: React.FunctionComponent = () => {
  return (
    <div className="navbar">
      <div className="navbar-measure">
        <div className="navbar-items">
          <Link href="/">
            <a className="navbar-title">{process.env.NEXT_PUBLIC_TITLE}</a>
          </Link>
        </div>

        <div className="navbar-items-grow"></div>
        <div className="navbar-items navbar-search"><i className="fal fa-search fa-lg"></i></div>
      </div>
    </div>
  );
}

export default Navbar;