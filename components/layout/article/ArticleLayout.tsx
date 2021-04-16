import React from 'react';

const ArticleLayout = (props: React.PropsWithChildren<{}>) => {
  return (
    <div className="article-grid">
      {props.children}
    </div>
  );
}

export default ArticleLayout;