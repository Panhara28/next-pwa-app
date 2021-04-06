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
import { useRouter } from 'next/router';
import { graphQuery } from '../../../generated/graphQuery';

const Article = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const article: Graph.Article = data.article;
  const articleRelated: Graph.Article[] = data.articleRelated;

  const [ nextIds, setNextIds ] = useState<number[]>(article.nextId ? [ article.nextId ] : []);
  const router = useRouter();

  return (
    <Container>
      <Measure>
        <ArticleDetail article={article} articleRelated={articleRelated}/>
        
        {
          nextIds.map((nextId, inx) => {
            return (
              <LazyLoading key={inx}>
                <ArticleNext nextId={nextId} onCompleted={(article) => { 
                  if(article) router.replace( `/article/${article.id}/${getArticleTitleSlug(article.title)}`, undefined, { shallow: true });
                  
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
  const { articleId } = context.params;

  const client = initializeApollo();
  const article = (await client.query({
    query: graphQuery.QUERY_ARTICLE,
    variables: { id: Number(articleId) }
  })).data.article;

  const articleRelated = (await client.query({
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