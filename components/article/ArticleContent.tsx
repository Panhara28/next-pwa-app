import React, { useEffect, useState } from 'react';
import { Graph } from '../../generated/graph';
import { renderArticleImage, renderArticleParagraph, renderArticleEmbed } from './../../functions/articleRenderer';
import useScript from './../hooks/useScript';

const ArticleContent = ({ article }: { article: Graph.Article}) => {
  const content = JSON.parse(article.content).blocks;

  const renderContents = {
    "paragraph": renderArticleParagraph,
    "image": renderArticleImage,
    "embed": renderArticleEmbed
  };

  // Init embed 
  initEmbed();
  
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

const initEmbed = () => {
  const [scriptIG, setIGScript] = useState('');
  const [hasIGLoaded] = useScript(scriptIG, { async: true, isEnabled: !!scriptIG });

  const [scriptTwitter, setTwitterScript] = useState('');
  const [hasTwitterLoaded] = useScript(scriptTwitter, { async: true, isEnabled: !!scriptTwitter });

  const [scriptTiktok, setTiktokScript] = useState('');
  const [hasTiktokLoaded] = useScript(scriptTiktok, { async: true, isEnabled: !!scriptTiktok });

  useEffect(() => {
    const articleContentElms = document.querySelector(".article-layout-detail .content");

    if(articleContentElms) {
      // Detect instagram embed
      if(articleContentElms.querySelector(".instagram-media")) {
        // Ref: https://stackoverflow.com/questions/27408917/instagram-embeds-not-working-when-adding-embeds-dynamically
        if (hasIGLoaded && (window as any)?.instgrm?.Embeds) {
          (window as any).instgrm.Embeds.process();
        } else {
          setIGScript('https://instagram.com/embed.js');
        }
      }

      // Detect twitter embed
      if (articleContentElms.querySelector('.twitter-tweet')) {
        // Ref: https://stackoverflow.com/questions/9423182/can-twitters-embedded-tweets-be-rendered-dynamically
        if (hasTwitterLoaded && (window as any)?.twttr?.widgets) {
          (window as any).twttr.widgets.load();
        } else {
          setTwitterScript('https://platform.twitter.com/widgets.js');
        }
      }

      // Detect tiktok embed
      if (articleContentElms.querySelector('.tiktok-embed')) {
        // Ref: https://developers.tiktok.com/doc/Embed
        // Because of tiktok does not have init function
        // We have to re-add the script everytime the component is loaded
        // Prevent caching by using timestamp

        if (hasTiktokLoaded) {
          setTiktokScript(`https://tiktok.com/embed.js?timestamp=${Date.now()}`);
        } else {
          setTiktokScript(`https://tiktok.com/embed.js`);
        }
      }
    }
  }, []);
}

export default ArticleContent;