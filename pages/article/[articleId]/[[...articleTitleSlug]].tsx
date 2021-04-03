import React from 'react';
import Container from '../../../components/layout/Container';
import SEO from '../../../components/layout/SEO';
import Measure from '../../../components/layout/Measure';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { gql } from '@apollo/client';
import { Graph } from '../../../generated/graph';
import ArticleLayout from '../../../components/layout/article/ArticleLayout';
import ArticleLayoutDetail from '../../../components/layout/article/ArticleLayoutDetail';
import ArticleLayoutSide from '../../../components/layout/article/ArticleLayoutSide';
import Image from 'next/image';
import { parsedImage } from '../../../functions/Image';
import ArticleContent from '../../../components/article/ArticleContent';
import { getArticleCategoryName } from '../../../functions/articleHelper';
import { getDateByFormat, getElapseTime } from '../../../functions/date';
import ArticleRelated from './../../../components/article/ArticleRelated';

const QUERY_ARTICLE = gql`
  query article($id: Int!) {
    article(id: $id) {
      id
      title
      content
      summary
      nextId
      categoryId
      categorySubId
      categoryName {
        kh
      }
      categoryNameSub {
        kh
      }
      publishedDateTime {
        en
      }
      thumbnail
      contentWriter {
        id
        groupId
        profilePicture
        nameDisplay
        username
        name {
          en
        }
      }
    }
  }
`;

const QUERY_ARTICLE_RELATED = gql`
  query ArticleList($pagination: PaginationInput!, $filter: ArticleFilterInput, $sort: ArticleSortEnum) {
    articleList(pagination: $pagination, filter: $filter, sort: $sort) {
      data {
        id
        title
        thumbnail 
        publishedDateTime {
          en
        } 
      }
    }
  }
`;

const Article = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const article: Graph.Article = data.article;
  const articleRelated: Graph.Article[] = data.articleRelated;

  return (
    <Container>
      <Measure>
        <ArticleDetail article={article} articleRelated={articleRelated} pathname={data.pathname}/>
      </Measure>
    </Container>
  )
}

const ArticleDetail = ({ article, articleRelated, pathname }: { article: Graph.Article, articleRelated: Graph.Article[], pathname: string }) => {
  return (
    <>
      <SEO 
        title={article.title}
        pathname={pathname}
        description={article.summary}
        type={"article"}
        image={article.thumbnail}
      />

      <ArticleLayout>
        <ArticleLayoutDetail>
          <h1 className="title">{ article.title }</h1>
          <div className="thumbnail"><Image src={parsedImage(article.thumbnail, 1200, 630)} alt={article.thumbnail} width={420} height={220}/></div>
          <div className="summary">
            <div className="category">{getArticleCategoryName(article)}</div>
            <span className="datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}</span>
            <span className="datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</span>
            <p className="title-sub">{article.summary}</p>
          </div>

          <ArticleContent article={article}/>
        </ArticleLayoutDetail>
        <ArticleLayoutSide>
          <ArticleRelated article={article} articleRelated={articleRelated}/>
        </ArticleLayoutSide>
      </ArticleLayout>
    </>
  );
}

const ArticleNext = ({ nextId, onCompleted }: { nextId: number, onCompleted: () => void }) => {

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { articleId } = context.params;

  let client = initializeApollo();
  const article = (await client.query({
    query: QUERY_ARTICLE,
    variables: { id: Number(articleId) }
  })).data.article;

  const articleRelated = (await client.query({
    query: QUERY_ARTICLE_RELATED,
    variables: {
      pagination: {
        page: 1,
        size: 4
      }, filter:{
        format: "EDITOR_JS",
        type: "PUBLISHED",
        siteId: Number(process.env.NEXT_PUBLIC_SITE_ID),
        categoryId: !process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? article.categoryId : undefined,
        categorySubId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? article.categorySubId : undefined,
        exceptCategories: JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS),
        writerId: article.contentWriter.id
      }, sort: "PUBLISHED"
    }
  })).data.articleList.data;

  // Remove article to prevent duplicate with the current article from the same writer
  const articleRelatedFiltered = [...articleRelated];
  for(let i = 0; i < articleRelated.length; i++) {
    if(articleRelated[i].id === article.id) {
      articleRelatedFiltered.splice(i, 1);
    }
  }

  return {
    props: { 
      data: {
        article: article,
        articleRelated: articleRelatedFiltered,
        pathname: context.resolvedUrl
      } 
    }
  };
}

export default Article;