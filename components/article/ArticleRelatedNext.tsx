import useTranslation from "next-translate/useTranslation";
import { ReactNode } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Graph } from "../../generated/graph";
import ArticleDetail from './ArticleDetail';

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

const ArticleRelatedNext = ({ article }: { article: Graph.Article}) => {
  const { t } = useTranslation();

  let article_next: ReactNode;
  const { data, error } = useQuery<Graph.Query>(QUERY_ARTICLE_RELATED, {
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
  });

  if(error) return <div className="error">{ t("error:description.general") }</div>;

  if(data && data.articleList) {
    // Remove article to prevent duplicate with the current article from the same writer
    const articleRelated = [...data.articleList.data];
    for(let i = 0; i < articleRelated.length; i++) {
      if(articleRelated[i].id === article.id) {
        articleRelated.splice(i, 1);
        break;
      }
    }

    article_next = 
    <ArticleDetail 
      article={article} 
      articleRelated={articleRelated}
    />;
  }

  return <>{article_next}</>;
}

export default ArticleRelatedNext;