import React from 'react';

const ArticleLayout: React.FunctionComponent = (props) => {
  return (
    <div className="article-grid">
      {props.children}
    </div>
  );
}

export default ArticleLayout;