import React from 'react';

const ArticleLayoutDetail: React.FunctionComponent = (props) => {
  return (
    <div className="article-layout-detail">
      {props.children}
    </div>
  );
}

export default ArticleLayoutDetail;