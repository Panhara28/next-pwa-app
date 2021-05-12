import React, { useState } from 'react';
import Container from '../../components/layout/Container';
import Measure from '../../components/layout/Measure';
import SEO from '../../components/utilities/SEO';
import useTranslation from 'next-translate/useTranslation';
import PalceholderArticleList from '../../components/placeholder/article/PlaceholderArticleList';
import LazyLoading from '../../components/utilities/LazyLoading';
import ArticleListNext from '../../components/article/ArticleListNext';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { Graph } from '../../generated/graph';
import ArticleList from '../../components/article/ArticleList';
import { graphQuery } from '../../generated/graphQuery';
import { getLastSevenDaysDate } from '../../functions/date';
import ArticleListSmall from '../../components/article/ArticleListSmall';
import ArticleTop from '../../components/article/ArticleTop';
import { sortArticle } from '../../functions/articleHelper';
import { getNowDate } from './../../functions/date';
import ReviveAd from '../../components/utilities/ReviveAd';

const Category = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const category: Graph.Category = data.category;
  const articleLatest: Graph.Article[] = data.articleLatest;
  const articleWeekly: Graph.Article[] = data.articleWeekly;

  const [ articleTop5, articleList ] = sortArticle(articleLatest);
  const { t } = useTranslation();
  const [ nextPages, setNextPages ] = useState([2]);  
  const [ loading, setLoading ] = useState(true);
  const placeholder = loading ? <PalceholderArticleList/> : null;
  const lazyLoadArticleList = nextPages.map((page, inx) => {
    return (
      <LazyLoading key={inx}>
        <ArticleListNext
          page={page} 
          categorySlug={category.alias} 
          onCompleted={(articles, nextPage) => { 
            if(articles.length > 0) {
              setNextPages([...nextPages, nextPage]); 
            } else {
              setLoading(false);
            }
          }}
        />
      </LazyLoading>
    );
  });

  return (
    <Container>
      <SEO title={category.name.kh} pathname={`/category/${category.alias}`}/>

      <Measure>
        <ReviveAd 
          className="mt-2" 
          zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_ONE} 
          screens={["desktop", "tablet-big", "tablet", "mobile"]} 
          categorySlug={category.alias}
          fullWidth={true} 
          width={1100}
          height={240}
        />

        <div className="container-grid">
          <div className="grid-article-top">
            <ArticleTop articleTop={articleTop5}/>
          </div>
          <div className="grid-article-weekly">
            <ReviveAd 
              className="mt-2" 
              zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_TWO} 
              screens={["tablet"]} 
              categorySlug={category.alias}
              width={300}
              height={250}
            />

            <ReviveAd 
              className="mt-1"
              zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_TWO} 
              screens={["desktop", "tablet-big", "mobile"]} 
              categorySlug={category.alias}
              fullWidth={true} 
              width={300}
              height={250}
            />

            <h2 className="uppercase">{t("common:weekly-article")}</h2>
            <ArticleListSmall articles={articleWeekly}/>

            <ReviveAd 
              className="mt-2" 
              zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_TWO} 
              screens={["tablet"]} 
              categorySlug={category.alias}
              width={300}
              height={250}
            />

            <ReviveAd 
              className="mt-2" 
              zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_TWO} 
              screens={["mobile"]} 
              categorySlug={category.alias}
              fullWidth={true} 
              width={300}
              height={250}
            />

            <ReviveAd 
              className="mt-2" 
              zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_THREE} 
              screens={["desktop", "tablet-big"]} 
              categorySlug={category.alias}
              fullWidth={true} 
              width={300}
              height={450}
            />
          </div>
          <div className="grid-article-latest">
            <h2 className="uppercase">{t("common:latest-article")}</h2>
            <ArticleList articles={articleList}/>

            {lazyLoadArticleList}
            {placeholder}
          </div>
        </div>
      </Measure>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = initializeApollo();
  const { categorySlug } = context.query;

  let category: Graph.Category;
  try {
    category = (await client.query({
      query: graphQuery.QUERY_CATEGORY,
      variables: { categorySlug }
    })).data.category;
  } catch(e) {
    return { notFound: true };
  }

  // Check if the category is exist
  if(!category) return { notFound: true };

  const articleLatest: Graph.Article[] = (await client.query({
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
        categorySlug: !process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? categorySlug : undefined,
        categorySubSlug: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? categorySlug : undefined,
        exceptCategories: process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS ? JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS) : undefined
      }, sort: "PUBLISHED"
    }
  })).data.articleList.data;

  const articleWeekly: Graph.Article[] = (await client.query({
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
        categorySlug: !process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? categorySlug : undefined,
        categorySubSlug: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? categorySlug : undefined,
        exceptCategories: process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS ? JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS) : undefined,
        startDate: getLastSevenDaysDate(),
        endDate: getNowDate()
      }, sort: "PAGEVIEW"
    }
  })).data.articleList.data;

  return {
    props: {
      data: {
        category: category,
        articleLatest: articleLatest,
        articleWeekly: articleWeekly
      }
    }
  };
}

export default Category;