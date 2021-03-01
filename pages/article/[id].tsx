import React from 'react';
import Container from '../../components/layout/Container';
import SEO from '../../components/layout/SEO';
import { useRouter } from 'next/router';
import Measure from '../../components/layout/Measure';

const Article: React.FunctionComponent  = (props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <SEO/>

      <Measure>
        <h1>Article: {id}</h1>
      </Measure>
    </Container>
  )
}

export default Article;