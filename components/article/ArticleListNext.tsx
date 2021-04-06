import useTranslation from "next-translate/useTranslation";
import { ReactNode } from 'react';
import { useQuery } from '@apollo/client';
import { Graph } from "../../generated/graph";
import ReactGA from 'react-ga';
import ArticleList from './ArticleList';
import { graphQuery } from "../../generated/graphQuery";

const ArticleListNext = ({ page, onCompleted }: { page: number, onCompleted: (nextPage: number) => void }) => {
  const { t } = useTranslation();
  
  let articleLatest: ReactNode;
  const { data, error } = useQuery<Graph.Query>(graphQuery.QUERY_ARTICLE_LATEST, {
    variables: {
      pagination: {
        page: page,
        size: 10
      }, filter:{
        format: "EDITOR_JS",
        type: "PUBLISHED",
        siteId: Number(process.env.NEXT_PUBLIC_SITE_ID),
        categoryId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? Number(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) : undefined,
        exceptCategories: JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS)
      }, sort: "PUBLISHED"
    },
    onCompleted: () => {
      ReactGA.pageview('/?page=' + page);
      onCompleted(++page);
    }
  });

  if(error) return <div className="error">{ t("error:description.general") }</div>;

  if(data && data.articleList) {
    articleLatest = <ArticleList articles={data.articleList.data}/>;
  }

  return <>{articleLatest}</>;
}

export default ArticleListNext;