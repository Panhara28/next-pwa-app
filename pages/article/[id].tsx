import React from 'react';
import Container from '../../components/layout/Container';
import SEO from '../../components/layout/SEO';
import Measure from '../../components/layout/Measure';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { gql } from '@apollo/client';
import { Graph } from '../../generated/graph';

const QUERY_ARTICLE = gql`
  query article($id: Int!) {
    article(id: $id) {
      id
      title
      content
      summary
      nextId
      categoryName {
        kh
      }
      publishedDateTime {
        kh
      }
      thumbnail
      contentWriter {
        id
        groupId
        profilePicture
        nameDisplay
        username
        name {
          kh
        }
      }
    }
  }
`;

const Article = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const article: Graph.Article = data.article;
  
  return (
    <Container>
      <SEO/>

      <Measure>
        <h1>Article: { article.title }</h1>
      </Measure>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  let client = initializeApollo();
  const { data } = await client.query({
    query: QUERY_ARTICLE,
    variables: { id: Number(id) }
  });

  return {
    props: { data }
  };
}

export default Article;