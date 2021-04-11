import React, { useState } from 'react';
import Container from '../components/layout/Container';
import Measure from '../components/layout/Measure';
import SEO from '../components/utilities/SEO';
import useTranslation from 'next-translate/useTranslation';
import PalceholderArticleList from '../components/placeholder/article/PlaceholderArticleList';
import LazyLoading from '../components/utilities/LazyLoading';
import ArticleListNext from '../components/article/ArticleListNext';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo } from './../lib/apolloClient';
import { Graph } from '../generated/graph';
import ArticleList from '../components/article/ArticleList';
import { graphQuery } from '../generated/graphQuery';
import { getEndOfWeekDate, getStartOfWeekDate } from './../functions/date';
import ArticleListSmall from '../components/article/ArticleListSmall';

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const articleLatest: Graph.Article[] = data.articleLatest;
  const articleWeekly: Graph.Article[] = data.articleWeekly;

  const [ articleTop5, articleList ] = sortArticle(articleLatest);
  const { t } = useTranslation();
  const [ nextPages, setNextPages ] = useState<number[]>([2]);
  
  return (
    <Container>
      <SEO/>

      <Measure>
        <div className="container-grid">
          <div className="grid-article-top">
            {/* <h2 className="uppercase">{t("common:trending-article")}</h2> */}
          </div>
          <div className="grid-article-weekly">
            <h2 className="uppercase">{t("common:weekly-article")}</h2>

            <ArticleListSmall articles={articleWeekly}/>
          </div>
          <div className="grid-article-latest">
            <h2 className="uppercase">{t("common:latest-article")}</h2>
            <ArticleList articles={articleList}/>

            {
              nextPages.map((page, inx) => {
                return (
                  <LazyLoading key={inx}>
                    <ArticleListNext page={page} onCompleted={(nextPage) => { setNextPages([...nextPages, nextPage]); }}/>
                  </LazyLoading>
                );
              })
            }

            <PalceholderArticleList/>
          </div>
        </div>
      </Measure>
    </Container>
  )
}

const sortArticle = (articles: Graph.Article[]) => {
  let articleList = [...articles];
  
  // Sort by pageview
  articleList.sort((a, b) => b.pageview - a.pageview);

  // Get top 5 and remove from the list
  const articleTop5 = articleList.splice(0, 5);

  return [ articleTop5, articleList ];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo();

  const articleLatest = (await client.query({
    query: graphQuery.QUERY_ARTICLE_LATEST,
    variables: {
      pagination: {
        page: 1,
        size: 20
      }, filter:{
        format: "EDITOR_JS",
        type: "PUBLISHED",
        siteId: Number(process.env.NEXT_PUBLIC_SITE_ID),
        categoryId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? Number(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) : undefined,
        exceptCategories: JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS)
      }, sort: "PUBLISHED"
    }
  })).data.articleList.data;

  const articleWeekly = (await client.query({
    query: graphQuery.QUERY_ARTICLE_LATEST,
    variables: {
      pagination: {
        page: 1,
        size: 7
      }, filter:{
        format: "EDITOR_JS",
        type: "PUBLISHED",
        siteId: Number(process.env.NEXT_PUBLIC_SITE_ID),
        categoryId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? Number(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) : undefined,
        exceptCategories: JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS),
        startDate: getStartOfWeekDate(),
        endDate: getEndOfWeekDate()
      }, sort: "PAGEVIEW"
    }
  })).data.articleList.data;

  return {
    props: {
      data: {
        articleLatest: articleLatest,
        articleWeekly: articleWeekly
      }
    }
  };
}

export default Home;