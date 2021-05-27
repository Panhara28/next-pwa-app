import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useRef, useState } from 'react';
import { Graph } from '../../generated/graph';
import { renderArticleImage, renderArticleParagraph, renderArticleEmbed, renderArticleHeader, renderArticleListItem, renderArticleBlockQuote, renderArticleCode, renderArticleSource } from './../../functions/articleRenderer';
import useScript from './../hooks/useScript';
import ReviveAd from '../utilities/ReviveAd';

const ArticleContent = ({ article }: { article: Graph.Article}) => {
  const { t } = useTranslation();
  const content = JSON.parse(article.content).blocks;
  const containerRef = useRef<HTMLDivElement>(null);

  // Inject the ads in the second blocks
  if (content.length >= 2) {
    content.splice(2, 0, {
      type: "telegram"
    });

    content.splice(3, 0, {
      type: "ads"
    });
  }
  
  const renderContents = {
    "paragraph": renderArticleParagraph,
    "header": renderArticleHeader,
    "image": renderArticleImage,
    "embed": renderArticleEmbed,
    "list": renderArticleListItem,
    "quote": renderArticleBlockQuote,
    "code": renderArticleCode,
    "source": renderArticleSource,
    "ads": (_, inx) => {
      return (
        <div className="article-content-ads" key={inx}>
          <ReviveAd 
            zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_TWO} 
            screens={["tablet"]} 
            categorySlug={article.categorySlug}
            width={300}
            height={250}
          />

          <ReviveAd 
            zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_TWO} 
            screens={["mobile"]} 
            categorySlug={article.categorySlug}
            fullWidth={true} 
            width={300}
            height={250}
          />
        </div>
      );
    },
    "telegram": (_, inx) => {
      if(process.env.NEXT_PUBLIC_TELEGRAM) {
        return(
          <a key={inx} className="article-content-telegram-link" target="_blank" href={process.env.NEXT_PUBLIC_TELEGRAM}>
            <i className="fab fa-telegram fa-lg fa-spin"></i> {t("article:join-us-on-telegram-to-get-the-fastest-news")}
          </a>
        )
      }
      
      return null;
    }
  };

  // Init embed 
  initEmbed(containerRef);
  
  return (
    <div ref={containerRef} className="grid-article-content">
      {
        content.map((block, inx) => {
          if(renderContents[block.type] === undefined) return null;

          if(block.type === "source") {
            return renderContents[block.type](block, inx, t("article:source"));
          } else {
            return renderContents[block.type](block, inx);
          }
        })
      }

      <div className="article-content-share" onClick={() => share(article)}><i className="fal fa-share-alt fa-lg"></i></div>
    </div>
  );
}

const share = (article: Graph.Article) => {
  const shareData = {
    title: article.title,
    text: article.summary,
    url: `/article/${article.id}`
  }

  window.navigator.share(shareData);
}

const initEmbed = (containerRef) => {
  const [scriptFacebook, setFacebookScript] = useState('');
  const [hasFacebookLoaded] = useScript(scriptFacebook, { async: true, isEnabled: !!scriptFacebook });

  const [scriptIG, setIGScript] = useState('');
  const [hasIGLoaded] = useScript(scriptIG, { async: true, isEnabled: !!scriptIG });

  const [scriptTwitter, setTwitterScript] = useState('');
  const [hasTwitterLoaded] = useScript(scriptTwitter, { async: true, isEnabled: !!scriptTwitter });

  const [scriptTiktok, setTiktokScript] = useState('');
  const [hasTiktokLoaded] = useScript(scriptTiktok, { async: true, isEnabled: !!scriptTiktok });

  useEffect(() => {
    const articleContentElms = containerRef.current;

    if(articleContentElms) {
      // Detect facebook embed
      if(articleContentElms.querySelector(".facebook_post") || articleContentElms.querySelector(".facebook_video")) {
        // Ref: https://stackoverflow.com/questions/11536314/how-to-re-init-facebook
        if (hasFacebookLoaded && (window as any)?.FB?.XFBML) {
          (window as any).FB.XFBML.parse();
        } else {
          setFacebookScript('https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0');
        }
      }

      // Detect instagram embed
      if(articleContentElms.querySelector(".instagram")) {
        // Ref: https://stackoverflow.com/questions/27408917/instagram-embeds-not-working-when-adding-embeds-dynamically
        if (hasIGLoaded && (window as any)?.instgrm?.Embeds) {
          (window as any).instgrm.Embeds.process();
        } else {
          setIGScript('https://instagram.com/embed.js');
        }
      }

      // Detect twitter embed
      if (articleContentElms.querySelector('.twitter')) {
        // Ref: https://stackoverflow.com/questions/9423182/can-twitters-embedded-tweets-be-rendered-dynamically
        if (hasTwitterLoaded && (window as any)?.twttr?.widgets) {
          (window as any).twttr.widgets.load();
        } else {
          setTwitterScript('https://platform.twitter.com/widgets.js');
        }
      }

      // Detect tiktok embed
      if (articleContentElms.querySelector('.tiktok')) {
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
  }, [hasFacebookLoaded, hasIGLoaded, hasTwitterLoaded, hasTiktokLoaded]);
}

export default ArticleContent;