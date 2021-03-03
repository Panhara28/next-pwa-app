import React from 'react';

const ArticleLayout: React.FunctionComponent = (props) => {
  return (
    <div className="article-layout">
      {props.children}
    </div>
  );
}

export default ArticleLayout;