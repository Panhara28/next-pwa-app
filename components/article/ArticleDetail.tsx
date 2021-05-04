import ArticleLayout from './../layout/article/ArticleLayout';
import ArticleLayoutDetail from './../layout/article/ArticleLayoutDetail';
import ArticleContent from './ArticleContent';
import ArticleLayoutSide from './../layout/article/ArticleLayoutSide';
import { Graph } from "../../generated/graph";
import Image from "next/image";
import { parsedImage } from './../../functions/Image';
import { getArticleCategoryName } from './../../functions/articleHelper';
import { getDateByFormat, getElapseTime } from './../../functions/date';
import SEO from '../utilities/SEO';
import ArticleTracker from "./ArticleTracker";
import ArticleRelated from "./ArticleRelated";
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReviveAd from './../utilities/ReviveAd';

const ArticleDetail = ({ article, articleRelated }: { article: Graph.Article, articleRelated: Graph.Article[] }) => {
  const router = useRouter();
  const pathname = `/article/${article.id}`;
  const [ seo, setSeo ] = useState<JSX.Element>(null);

  return (
    <ArticleTracker 
      articleId={article.id}
      onReach={() => {
        setSeo(null);// Resetting SEO
        setSeo(<SEO 
          title={article.title}
          pathname={pathname}
          description={article.summary}
          type={"article"}
          image={article.thumbnail}
        />);

        router.push(pathname, undefined, { shallow: true });
      }}
    >
      <ReviveAd className="mt-2" zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_ONE} screens={["desktop", "tablet-big", "tablet", "mobile"]} fullWidth={true} categorySlug={article.categorySlug}/>

      <ArticleLayout>
        {seo}

        <ArticleLayoutDetail>
          <h1 className="grid-article-title">{ article.title }</h1>
          <div className="grid-article-thumbnail"><Image priority={true} src={parsedImage(article.thumbnail, 400, 210)} alt={article.thumbnail} width={400} height={210} quality={100}/></div>        
          <div className="grid-article-summary">
            <div className="article-summary-category">{getArticleCategoryName(article)}</div>
            <span className="article-summary-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}</span>
            <span className="article-summary-datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</span>
            <p className="article-summary-title-sub">{article.summary}</p>
          </div>

          <ArticleContent article={article}/>
        </ArticleLayoutDetail>
        <ArticleLayoutSide>
          <ArticleRelated article={article} articles={articleRelated}/>

          <ReviveAd className="mt-2" zoneId={process.env.NEXT_PUBLIC_ADS_ZONE_THREE} screens={["desktop", "tablet-big"]} fullWidth={true} categorySlug={article.categorySlug}/>
        </ArticleLayoutSide>
      </ArticleLayout>
    </ArticleTracker>
  );
}

export default ArticleDetail;