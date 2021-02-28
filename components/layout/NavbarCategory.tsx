import Link from 'next/link';
import React from 'react';

const NavbarCategory: React.FunctionComponent = () => {
  return (
    <div className="navbar-category">
      <div className="navbar-category-measure">
        <div className="navbar-category-items">
          <Link href="/">
            <a>បាល់ទាត់</a>
          </Link>
        </div>

        <div className="navbar-category-items">
          <Link href="/">
            <a>ប្រដាល់</a>
          </Link>
        </div>

        <div className="navbar-category-items">
          <Link href="/">
            <a>ប្រវត្តិ</a>
          </Link>
        </div>

        <div className="navbar-category-items">
          <Link href="/">
            <a>កីឡាផ្សេងៗ</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavbarCategory;