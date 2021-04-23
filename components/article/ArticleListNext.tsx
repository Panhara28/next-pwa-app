import useTranslation from "next-translate/useTranslation";
import { useQuery } from '@apollo/client';
import { Graph } from "../../generated/graph";
import ReactGA from 'react-ga';
import ArticleList from './ArticleList';
import { graphQuery } from "../../generated/graphQuery";

type Props = {
  page: number
  categorySlug?: string
  topic?: string 
  onCompleted: (articles: Graph.Article[], nextPage: number) => void
}

const ArticleListNext = ({ page, topic, categorySlug, onCompleted }: Props) => {
  const { t } = useTranslation();
  
  let articleLatest: JSX.Element;
  const { data, error } = useQuery<Graph.Query>(graphQuery.QUERY_ARTICLE_LATEST, {
    variables: {
      pagination: {
        page: page,
        size: 10
      }, filter:{
        title: topic,
        format: "EDITOR_JS",
        type: "PUBLISHED",
        siteId: Number(process.env.NEXT_PUBLIC_SITE_ID),
        categoryId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? Number(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) : undefined,
        categorySlug: !process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? categorySlug : undefined,
        categorySubSlug: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? categorySlug : undefined,
        exceptCategories: process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS ? JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS) : undefined
      }, sort: "PUBLISHED"
    },
    onCompleted: (data) => {
      if(data && data.articleList) {
        ReactGA.pageview(`${window.location.pathname}${window.location.search}/?page=${page}`);
        onCompleted(data.articleList.data, ++page);
      }
    }
  });

  if(error) return <div className="error">{ t("error:description.general") }</div>;

  if(data && data.articleList) {
    articleLatest = <ArticleList articles={data.articleList.data}/>;
  }

  return <>{articleLatest}</>;
}

export default ArticleListNext;