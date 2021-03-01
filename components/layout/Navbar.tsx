import Link from 'next/link';
import React from 'react';
import { LocalStorageOptions } from '../../generated/localStorageTypes';

const Navbar: React.FunctionComponent = () => {
  let options: LocalStorageOptions;
  if(process.browser) {
    options = JSON.parse(localStorage.getItem("options"));

    if(options && options.darkmode) {
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
        <div className="navbar-items" onClick={toggleDarkMode}><i className={"toggle-dark-mode-ico fal fa-lg" + (process.browser ? (options && options.darkmode ? " fa-sun" : " fa-moon") : "")}></i></div>
        <div className="navbar-items"><i className="fal fa-search fa-lg"></i></div>
      </div>
    </div>
  );
}

const toggleDarkMode = () => {
  document.querySelector('.container').classList.toggle('dark-mode');
  document.querySelector('.toggle-dark-mode-ico').classList.toggle('fa-moon');
  document.querySelector('.toggle-dark-mode-ico').classList.toggle('fa-sun');

  let options:LocalStorageOptions;
  if(localStorage.getItem("options")) {
    options = JSON.parse(localStorage.getItem("options"));
    options.darkmode = !options.darkmode;
  } else {
    options = {
      darkmode: true
    };
  }

  localStorage.setItem("options", JSON.stringify(options));
}

export default Navbar;