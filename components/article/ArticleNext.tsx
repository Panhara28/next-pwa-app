import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Graph } from '../../generated/graph';
import ReactGA  from 'react-ga';
import { getArticleTitleSlug } from './../../functions/articleHelper';
import ArticleRelatedNext from './ArticleRelatedNext';

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

const ArticleNext = ({ nextId, onCompleted }: { nextId: number, onCompleted: (article: Graph.Article) => void }) => {
  const { t } = useTranslation();

  let article_next: ReactNode;
  const { data, error } = useQuery<Graph.Query>(QUERY_ARTICLE, {
    variables: { id: nextId },
    onCompleted: (data) => {
      //ReactGA.pageview(`/article/${data.article.id}/${getArticleTitleSlug(data.article.title)}`);

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