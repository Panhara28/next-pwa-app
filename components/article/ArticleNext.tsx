import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';
import { useQuery } from '@apollo/client';
import { Graph } from '../../generated/graph';
import ArticleRelatedNext from './ArticleRelatedNext';
import { graphQuery } from '../../generated/graphQuery';

const ArticleNext = ({ nextId, onCompleted }: { nextId: number, onCompleted: (article: Graph.Article) => void }) => {
  const { t } = useTranslation();

  let article_next: ReactNode;
  const { data, error } = useQuery<Graph.Query>(graphQuery.QUERY_ARTICLE, {
    variables: { id: nextId },
    onCompleted: (data) => {
      onCompleted(data.article);
    }
  });

  if(error) return <div className="error">{ t("error:description.general") }</div>;

  if(data && data.article) {
    article_next = <ArticleRelatedNext article={data.article}/>;
  }

  return <>{article_next}</>;
}

export default ArticleNext;