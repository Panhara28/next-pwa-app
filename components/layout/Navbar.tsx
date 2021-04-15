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
        <div className="navbar-items" onClick={() => { toggleDarkMode(colorMode, setColorMode) }}><i className={"toggle-dark-mode-ico fal fa-lg" + (process.browser ? (colorMode === "dark" ? " fa-sun" : " fa-moon") : "")}></i></div>
        <div className="navbar-items"><i className="fal fa-search fa-lg"></i></div>
      </div>
    </div>
  );
}

const setCSSVar = (property, color) => {
  document.documentElement.style.setProperty(property, color);
}

const toggleDarkMode = (colorMode, setColorMode) => {
  document.querySelector('.toggle-dark-mode-ico').classList.toggle('fa-moon');
  document.querySelector('.toggle-dark-mode-ico').classList.toggle('fa-sun');

  let theme = {};
  if(colorMode === "dark") {
    theme = {
      '--color-text-primary': '#000000',
      '--color-text-secondary': '#474747',
      '--bg-color-navbar': process.env.NEXT_PUBLIC_COLOR_PRIMARY,
      '--bg-color-navbar-category': '#D7DBDD',
      '--bg-color-container': '#FBFCFC',
      '--bg-color-placeholder-animation': 'linear-gradient(90deg, hsla(0, 0%, 100%, 0) 46%, var(--bg-color-container) 50%, hsla(0, 0%, 100%, 0) 54%) 50% 50%'
    };
  } else {
    theme = {
      '--color-text-primary': '#FDFEFE',
      '--color-text-secondary': '#d0d3d4',
      '--bg-color-navbar': '#000000',
      '--bg-color-navbar-category': '#292929',
      '--bg-color-container': '#393939',
      '--bg-color-placeholder-animation': 'linear-gradient(90deg, hsla(0, 0%, 100%, 0) 46%, var(--bg-color-container) 50%, hsla(0, 0%, 100%, 0) 54%) 50% 50%'
    };
  }

  for(let key in theme) {
    setCSSVar(key, theme[key]);
  }

  setColorMode(colorMode === "dark" ? "light" : "dark");
}

export default Navbar;