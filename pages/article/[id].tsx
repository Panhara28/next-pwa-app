import React from 'react';
import Container from '../../components/layout/Container';
import SEO from '../../components/layout/SEO';
import Measure from '../../components/layout/Measure';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { gql } from '@apollo/client';
import { Graph } from '../../generated/graph';
import ArticleLayout from '../../components/layout/article/ArticleLayout';
import ArticleLayoutDetail from '../../components/layout/article/ArticleLayoutDetail';
import ArticleLayoutSide from '../../components/layout/article/ArticleLayoutSide';
import Image from 'next/image';
import { parsedImage } from './../../functions/Image';
import ArticleContent from '../../components/article/ArticleContent';
import useTranslation from 'next-translate/useTranslation';
import { getArticleCategoryName, getArticleContentWriterProfilePiceture } from './../../functions/articleHelper';
import { getDateByFormat, getElapseTime } from './../../functions/date';

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

const Article = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation();
  const article: Graph.Article = data.article;
  
  return (
    <Container>
      <SEO/>

      <Measure>
        <ArticleLayout>
          <ArticleLayoutDetail>
            <h1 className="title">{ article.title }</h1>
            <div className="thumbnail"><Image src={parsedImage(article.thumbnail)} alt={article.thumbnail} width={420} height={220}/></div>
            <div className="summary">
              <div className="category">{getArticleCategoryName(article)}</div>
              <span className="datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}</span>
              <span className="datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</span>
              <p className="title-sub">{article.summary}</p>
            </div>

            <ArticleContent article={article}/>
          </ArticleLayoutDetail>
          <ArticleLayoutSide>
            <div className="related-article">
              <div className="author">
                <Image src={getArticleContentWriterProfilePiceture(article)} alt={article.contentWriter.name.en} width={50} height={50}/>
                <div className="name">{article.contentWriter.nameDisplay}</div>
              </div>

              <h2 className="title">{ t("article:related-article") }</h2>
            </div>            
          </ArticleLayoutSide>
        </ArticleLayout>
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