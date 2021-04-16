import React from 'react';
import Container from '../../components/layout/Container';
import SEO from '../../components/utilities/SEO';
import { useRouter } from 'next/router';
import Measure from '../../components/layout/Measure';

const Category = (props: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Container>
      <SEO/>
      
      <Measure>
        <h1>Category: {slug}</h1>
      </Measure>
    </Container>
  )
}

export default Category;