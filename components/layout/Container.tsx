import React from 'react';
import Navbar from './Navbar';
import NavbarBottom from './NavbarBottom';
import NavbarCategory from './NavbarCategory';

const Container = (props: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Navbar/>
      <NavbarCategory/>
      
      <div className={"container"}>
        { props.children }
      </div>

      <NavbarBottom/>
    </>
  );
}

export default Container;