import React from 'react';
import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';
import NavbarCategory from '../components/layout/NavbarCategory';
import SEO from '../components/layout/SEO';

export default function Home() {
  return (
    <Container>
      <SEO/>

      <Navbar/>
      <NavbarCategory/>
    </Container>
  )
}