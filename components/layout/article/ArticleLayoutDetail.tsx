import React from 'react';

const ArticleLayoutDetail = (props: React.PropsWithChildren<{}>) => {
  return (
    <div className="grid-article-detail">
      {props.children}
    </div>
  );
}

export default ArticleLayoutDetail;