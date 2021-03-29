import Link from 'next/link';
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar: React.FunctionComponent = () => {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  if(process.browser) {
    if(colorMode === "dark") {
      document.querySelector(".toggle-dark-mode-ico").classList.add("fa-sun");
    } else {
      document.querySelector(".toggle-dark-mode-ico").classList.add("fa-moon");
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-measure">
        <div className="navbar-items">
          <Link href="/">
            <a className="navbar-title">{process.env.NEXT_PUBLIC_TITLE}</a>
          </Link>
        </div>

        <div className="navbar-items-grow"></div>
        <div className="navbar-items" onClick={() => { 
          toggleDarkMode();
          setColorMode(colorMode === "dark" ? "light" : "dark");
        }}><i className={"toggle-dark-mode-ico fal fa-lg" + (process.browser ? (colorMode === "dark" ? " fa-sun" : " fa-moon") : "")}></i></div>
        <div className="navbar-items"><i className="fal fa-search fa-lg"></i></div>
      </div>
    </div>
  );
}

const toggleDarkMode = () => {
  document.querySelector('.container').classList.toggle('dark-mode');
  document.querySelector('.toggle-dark-mode-ico').classList.toggle('fa-moon');
  document.querySelector('.toggle-dark-mode-ico').classList.toggle('fa-sun');
}

export default Navbar;