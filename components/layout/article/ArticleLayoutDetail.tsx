import React from 'react';

const ArticleLayoutDetail = (props: React.PropsWithChildren<{}>) => {
  return (
    <article className="grid-article-detail">
      {props.children}
    </article>
  );
}

export default ArticleLayoutDetail;