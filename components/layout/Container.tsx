import React from 'react';
import Navbar from './Navbar';
import NavbarCategory from './NavbarCategory';

const Container: React.FunctionComponent = (props) => {
  return (
    <div className={"container"}>
      <Navbar/>
      <NavbarCategory/>

      { props.children }
    </div>
  );
}

export default Container;