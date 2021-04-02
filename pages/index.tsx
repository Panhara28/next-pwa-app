import { gql, useQuery } from '@apollo/client';
import React, { ReactNode, useEffect, useState } from 'react';
import ArticleList from '../components/article/ArticleList';
import Container from '../components/layout/Container';
import Measure from '../components/layout/Measure';
import SEO from '../components/layout/SEO';
import { Graph } from '../generated/graph';
import useTranslation from 'next-translate/useTranslation';
import PalceholderArticleList from '../components/placeholder/article/PlaceholderArticleList';
import LazyLoading from '../components/utilities/LazyLoading';

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
  const { t } = useTranslation();
  const [ pages, setPages ] = useState<number[]>([1]);

  return (
    <Container>
      <SEO/>

      <Measure>
        <div style={{ maxWidth: "850px" }}>

          <h2 className="uppercase">{t("common:latest-article")}</h2>
          {
            pages.map((page, inx) => {
              return (
                <LazyLoading key={inx}>
                  <ArticleLatest page={page} onComplete={(page) => { setPages([...pages, page]); }}/>
                </LazyLoading>
              );
            })
          }

          <PalceholderArticleList/>
        </div>
      </Measure>
    </Container>
  )
}

const ArticleLatest = ({ page, onComplete }: { page: number, onComplete: (nextPage: number) => void }) => {
  const { t } = useTranslation();
  
  let article_latest: ReactNode;
  const { data, error } = useQuery<Graph.Query>(QUERY_ARTICLE_LATEST, {
    variables: {
      pagination: {
        page: page,
        size: 15
      }, filter:{
        format: "EDITOR_JS",
        type: "PUBLISHED",
        siteId: Number(process.env.NEXT_PUBLIC_SITE_ID),
        categoryId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? Number(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) : undefined,
        exceptCategories: JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS)
      }, sort: "PUBLISHED"
    },
    onCompleted: () => {
      onComplete(++page);
    }
  });

  useEffect(() => {
    if(data && data.articleList) {
      
    }
  }, [data]);

  if(error) return <div className="error">{ t("error:description.general") }</div>;

  if(data && data.articleList) {
    article_latest = ArticleList(data.articleList.data);
  }

  return <>{article_latest}</>;
}