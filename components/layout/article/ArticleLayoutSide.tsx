import React from 'react';

const ArticleLayoutSide = (props: React.PropsWithChildren<{}>) => {
  return (
    <div className="grid-article-side">
      {props.children}
    </div>
  );
}

export default ArticleLayoutSide;