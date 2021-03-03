import React from 'react';

const ArticleLayoutSide: React.FunctionComponent = (props) => {
  return (
    <div className="article-layout-side">
      {props.children}
    </div>
  );
}

export default ArticleLayoutSide;