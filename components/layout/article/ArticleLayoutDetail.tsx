import React from 'react';

const ArticleLayoutDetail: React.FunctionComponent = (props) => {
  return (
    <div className="grid-article-detail">
      {props.children}
    </div>
  );
}

export default ArticleLayoutDetail;