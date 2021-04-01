import React, { ReactNode } from 'react';
import Container from '../../../components/layout/Container';
import SEO from '../../../components/layout/SEO';
import Measure from '../../../components/layout/Measure';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { gql, useQuery } from '@apollo/client';
import { Graph } from '../../../generated/graph';
import ArticleLayout from '../../../components/layout/article/ArticleLayout';
import ArticleLayoutDetail from '../../../components/layout/article/ArticleLayoutDetail';
import ArticleLayoutSide from '../../../components/layout/article/ArticleLayoutSide';
import Image from 'next/image';
import { parsedImage } from '../../../functions/Image';
import ArticleContent from '../../../components/article/ArticleContent';
import useTranslation from 'next-translate/useTranslation';
import { getArticleCategoryName, getArticleContentWriterProfilePiceture } from '../../../functions/articleHelper';
import { getDateByFormat, getElapseTime } from '../../../functions/date';
import PalceholderArticleRelated from '../../../components/placeholder/article/PlaceholderArticleRelated';
import ArticleListRelated from './../../../components/article/ArticleListRelated';

const QUERY_ARTICLE = gql`
  query article($id: Int!) {
    article(id: $id) {
      id
      title
      content
      summary
      nextId
      categoryId
      categoryName {
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
  const { t } = useTranslation();
  const article: Graph.Article = data.article;

  return (
    <Container>
      <SEO 
        title={article.title}
        pathname={data.pathname}
        description={article.summary}
        type={"article"}
        image={article.thumbnail}
      />

      <Measure>
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
            <div className="article-related">
              <div className="author">
                <Image src={getArticleContentWriterProfilePiceture(article, 256, 256)} alt={article.contentWriter.name.en} width={50} height={50}/>
                <div className="name">{article.contentWriter.nameDisplay} {article.contentWriter.groupId === 13 ? "(C) " : ""}</div>
              </div>

              <h2>{ t("article:related-article") }</h2>

              <ArticleRelated writerId={article.contentWriter.id} categoryId={article.categoryId} categorySubId={article.categorySubId}/>
            </div>            
          </ArticleLayoutSide>
        </ArticleLayout>
      </Measure>
    </Container>
  )
}

const ArticleRelated = ({ writerId, categoryId, categorySubId }: { writerId: number, categoryId: number, categorySubId: number }) => {
  const { t } = useTranslation();

  let article_related: ReactNode;

  const { data, loading, error } = useQuery<Graph.Query>(QUERY_ARTICLE_RELATED, {
    variables: {
      pagination: {
        page: 1,
        size: 4
      }, filter:{
        format: "EDITOR_JS",
        type: "PUBLISHED",
        siteId: Number(process.env.NEXT_PUBLIC_SITE_ID),
        categoryId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? categoryId : categorySubId,
        exceptCategories: JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS),
        writerId: writerId
      }, sort: "PUBLISHED"
    }
  });

  if(loading) return <PalceholderArticleRelated/>;

  if(error) return <div className="error">{ t("error:description.general") }</div>;

  if(data && data.articleList) {
    // Remove the first article to prevent duplicate with the current article from the same writer
    let articles = [...data.articleList.data];
    articles.splice(0, 1);

    article_related = ArticleListRelated(articles);
  }

  return <>{article_related}</>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { articleId } = context.params;

  let client = initializeApollo();
  const { data } = await client.query({
    query: QUERY_ARTICLE,
    variables: { id: Number(articleId) }
  });

  return {
    props: { 
      data: {
        article: data.article,
        pathname: context.resolvedUrl
      } 
    }
  };
}

export default Article;