import Link from 'next/link';
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useRouter } from 'next/router';

const Navbar = (props: React.PropsWithChildren<{}>) => {
  const { colorMode, setColorMode } = useContext(ThemeContext);
  const router = useRouter();

  if(process.browser) {
    if(colorMode === "dark") {
      document.querySelector(".toggle-dark-mode-ico").classList.add("fa-sun");
    } else {
      document.querySelector(".toggle-dark-mode-ico").classList.add("fa-moon");
    }
  }

  const onPreviousPage = () => {
    // If not have previous history, go to home page
    // Ref: https://stackoverflow.com/questions/3588315/how-to-check-if-the-user-can-go-back-in-browser-history-or-not

    const haveHistory = window.history.length > 2;
    if(haveHistory) router.back();
    else router.push('/');
  }

  return (
    <div className="navbar">
      <div className="navbar-measure">
        <div className="navbar-items d-none d-block-tablet-big">
          <i className={`fal fa-chevron-left fa-lg fa-fw ${(router.pathname !== "/" ? "" : "hidden")}`}
            onClick={onPreviousPage}>
          </i>
        </div>

        <div className="navbar-items nav-items-title">
          <Link href="/">
            <a className="navbar-title">{process.env.NEXT_PUBLIC_TITLE}</a>
          </Link>
        </div>

        <div className="navbar-items-grow d-none-mobile"></div>

        <div className="navbar-items" onClick={() => { toggleDarkMode(colorMode, setColorMode) }}><i className={"toggle-dark-mode-ico fal fa-lg fa-fw" + (process.browser ? (colorMode === "dark" ? " fa-sun" : " fa-moon") : "")}></i></div>
        
        <Link href="/search">
          <a className={`navbar-items d-none-mobile`}><i className="fal fa-search fa-lg fa-fw"></i></a>
        </Link>

        <Link href="/menu">
          <a className={`navbar-items d-none-mobile`}><i className="fal fa-bars fa-lg fa-fw"></i></a>
        </Link>
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
      '--color-bg-primary': '#D7DBDD',
      '--color-bg-container': '#FBFCFC',
      '--color-bg-placeholder-animation': 'linear-gradient(90deg, hsla(0, 0%, 100%, 0) 46%, var(--color-bg-container) 50%, hsla(0, 0%, 100%, 0) 54%) 50% 50%',
      '--color-text-primary': '#000000',
      '--color-text-secondary': '#474747'
    };
  } else {
    theme = {
      '--color-bg-primary': '#292929',
      '--color-bg-container': '#393939',
      '--color-bg-placeholder-animation': 'linear-gradient(90deg, hsla(0, 0%, 100%, 0) 46%, var(--color-bg-container) 50%, hsla(0, 0%, 100%, 0) 54%) 50% 50%',
      '--color-text-primary': '#FDFEFE',
      '--color-text-secondary': '#d0d3d4'
    };
  }

  for(let key in theme) {
    setCSSVar(key, theme[key]);
  }

  setColorMode(colorMode === "dark" ? "light" : "dark");
}

export default Navbar;