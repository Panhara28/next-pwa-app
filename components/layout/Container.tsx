import React, { useState } from 'react';
import { LocalStorageOptions } from '../../generated/localStorageTypes';
import Navbar from './Navbar';
import NavbarCategory from './NavbarCategory';

const Container: React.FunctionComponent = (props) => {
  let options: LocalStorageOptions;
  if(process.browser) {
    options = JSON.parse(localStorage.getItem("options"));
    if(options && options.darkmode) {
      document.querySelector(".container").classList.add("dark-mode");
    }
  }

  return (
    <div className={"container" + (options && options.darkmode ? " dark-mode": "")}>
      <Navbar/>
      <NavbarCategory/>

      { props.children }
    </div>
  );
}

export default Container;