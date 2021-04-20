import React, { useState } from 'react';
import Container from '../../../components/layout/Container';
import Measure from '../../../components/layout/Measure';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { Graph } from '../../../generated/graph';
import PalceholderArticle from '../../../components/placeholder/article/PlaceholderArticle';
import LazyLoading from '../../../components/utilities/LazyLoading';
import ArticleDetail from './../../../components/article/ArticleDetail';
import ArticleNext from '../../../components/article/ArticleNext';
import { getArticleTitleSlug } from './../../../functions/articleHelper';
import { graphQuery } from '../../../generated/graphQuery';
import SEO from './../../../components/utilities/SEO';
import LocaleFlag from '../../../components/utilities/LocaleFlag';
import useTranslation  from 'next-translate/useTranslation';

const Article = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const article: Graph.Article = data.article;
  const articleRelated: Graph.Article[] = data.articleRelated;
  const pathname = `/article/${article.id}`;
  const canonical = pathname + `/${getArticleTitleSlug(article.title)}`;
  const [ nextIds, setNextIds ] = useState<number[]>(article.nextId ? [ article.nextId ] : []);
  const { t } = useTranslation(); 

  return (
    <Container>
      <Measure>
        <SEO 
          title={article.title}
          pathname={pathname}
          canonical={canonical}
          description={article.summary}
          type={"article"}
          image={article.thumbnail}
        />

        <ArticleDetail article={article} articleRelated={articleRelated}/>
        
        <LocaleFlag locales={["km"]}>
          <div className="contributor-registration">
            <h3>
              {t("article:want-to-become-a-paid-part-time-writer")}? <a target="_blank" rel="noopener" href="https://editor.khmerload.com/contributor/registration">{t("article:please-register-here")} <i className="fal fa-pencil-alt fa-lg"></i></a>
            </h3>
          </div>
        </LocaleFlag>

        {
          nextIds.map((nextId, inx) => {
            return (
              <LazyLoading key={inx}>
                <ArticleNext nextId={nextId} onCompleted={(article) => { 
                  if(article.nextId) {
                    setNextIds([...nextIds, article.nextId]); 
                  }
                }}/>
              </LazyLoading>
            );
          })
        }

        <PalceholderArticle/>
      </Measure>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { articleId } = context.query;
  const client = initializeApollo();

  let article: Graph.Article;
  try {
    article = (await client.query({
      query: graphQuery.QUERY_ARTICLE,
      variables: { id: Number(articleId) }
    })).data.article;
  } catch(e) {
    return { notFound: true };
  }

  // Check if the article is in correct format and correct site id
  if(!article || article.format !== "EDITOR_JS" || (article.siteId !== null && article.siteId !== Number(process.env.NEXT_PUBLIC_SITE_ID))) return { notFound: true };

  const articleRelated: Graph.Article[] = (await client.query({
    query: graphQuery.QUERY_ARTICLE_RELATED,
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
  for(let i = 0; i < articleRelatedFiltered.length; i++) {
    if(articleRelatedFiltered[i].id === article.id) {
      articleRelatedFiltered.splice(i, 1);
      break;
    }
  }

  return {
    props: { 
      data: {
        article: article,
        articleRelated: articleRelatedFiltered
      } 
    }
  };
}

export default Article;