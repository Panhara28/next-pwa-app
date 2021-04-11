import React from 'react';

const ArticleLayoutSide: React.FunctionComponent = (props) => {
  return (
    <div className="grid-article-side">
      {props.children}
    </div>
  );
}

export default ArticleLayoutSide;