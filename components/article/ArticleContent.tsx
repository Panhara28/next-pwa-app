import React from 'react';
import { Graph } from '../../generated/graph';
import { renderArticleImage, renderArticleParagraph } from './../../functions/articleRenderer';

const ArticleContent = ({ article }: { article: Graph.Article}) => {
  const content = JSON.parse(article.content).blocks;
  console.log(content);

  const renderContents = {
    "paragraph": renderArticleParagraph,
    "image": renderArticleImage
  };

  return (
    <div className="content">
      {
        content.map((block, inx) => {
          if (renderContents[block.type] === undefined) return null;
          return renderContents[block.type](block, inx);
        })
      }
    </div>
  );
}

export default ArticleContent;