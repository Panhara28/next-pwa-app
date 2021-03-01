import React from 'react';
import Container from '../../components/layout/Container';
import SEO from '../../components/layout/SEO';
import { useRouter } from 'next/router';

const Category: React.FunctionComponent  = (props) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Container>
      <SEO/>

      <h1>Category: {slug}</h1>
    </Container>
  )
}

export default Category;