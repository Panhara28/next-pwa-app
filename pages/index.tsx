import { gql, useQuery } from '@apollo/client';
import React, { ReactNode } from 'react';
import ArticleList from '../components/article/ArticleList';
import Container from '../components/layout/Container';
import Measure from '../components/layout/Measure';
import SEO from '../components/layout/SEO';
import Spinner from '../components/utilities/Spinner';
import { Graph } from '../generated/graph';
import useTranslation from 'next-translate/useTranslation';

const QUERY_ARTICLE_LATEST = gql`
  query ArticleList($pagination: PaginationInput!, $filter: ArticleFilterInput, $sort: ArticleSortEnum) {
    articleList(pagination: $pagination, filter: $filter, sort: $sort) {
      data {
        id
        title
        summary
        thumbnail
        categoryName {
          kh
        }
        categoryNameSub {
          kh
        }
        contentWriter {
          name {
            en
          }
          nameDisplay
          profilePicture
          groupId
        }     
        publishedDateTime {
          en
        } 
      }
    }
  }
`;

export default function Home() {
  return (
    <Container>
      <SEO/>

      <Measure>
        <div style={{ maxWidth: "850px" }}>
          <ArticleLatest/>
        </div>
      </Measure>
    </Container>
  )
}

const ArticleLatest = () => {
  const { t } = useTranslation();

  let article_latest: ReactNode;
  const { data, loading, error } = useQuery<Graph.Query>(QUERY_ARTICLE_LATEST, {
    variables: {
      pagination: {
        page: 1,
        size: 10
      }, filter:{
        format: "EDITOR_JS",
        type: "PUBLISHED",
        categoryId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? Number(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) : undefined,
        exceptCategories: JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS)
      }, sort: "CREATED"
    }
  });

  if(loading) return <Spinner/>;

  if(data && data.articleList) {
    article_latest = ArticleList(data.articleList.data);
  }

  return (
    <div>
      <h2>{t("common:latest-article")}</h2>

      {article_latest}
    </div>
  );
}