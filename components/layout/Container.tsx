import React, { useContext } from 'react';
import Navbar from './Navbar';
import NavbarCategory from './NavbarCategory';
import { ThemeContext } from './../context/ThemeContext';

const Container: React.FunctionComponent = (props) => {
  const { colorMode } = useContext(ThemeContext);

  if(process.browser) {
    if(colorMode === "dark") {
      document.querySelector(".container").classList.add("dark-mode");
    }
  }

  return (
    <div className={"container" + (colorMode === "dark" ? " dark-mode": "")}>
      <Navbar/>
      <NavbarCategory/>

      { props.children }
    </div>
  );
}

export default Container;