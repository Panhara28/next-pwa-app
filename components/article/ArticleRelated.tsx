import React from 'react';
import { Graph } from '../../generated/graph';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleContentWriterProfilePiceture } from '../../functions/articleHelper';
import { parsedImage } from '../../functions/Image';
import { getElapseTime, getDateByFormat } from '../../functions/date';
import useTranslation from 'next-translate/useTranslation';

const ArticleRelated = ({ article, articles }: { article: Graph.Article, articles: Graph.Article[] }) => {
  const { t } = useTranslation();

  const articleElms = articles.map(article => {
    return (
      <article className="article-list-small-item" key={article.id}>
        <Link href={`/article/${article.id}`}>
          <a className="article-list-small-item-thumbnail">
            <Image priority={true} unoptimized={true} src={parsedImage(article.thumbnail, 150, 80)} alt={article.thumbnail} width={150} height={80}/>
          </a>
        </Link>

        <div className="article-list-small-item-detail">
          <Link href={`/article/${article.id}`}><a><h4 className="article-list-small-item-detail-title">{article.title}</h4></a></Link>
          <div className="article-list-small-item-detail-datetime"><i className="fal fa-calendar-days"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}&nbsp;</div>
          <div className="article-list-small-item-detail-datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</div>
        </div>
      </article>
    );
  });

  return (
    <div className="article-related">
      <div className="article-related-author">
        <Image priority={true} unoptimized={true} src={getArticleContentWriterProfilePiceture(article, 128, 128)} alt={article.contentWriter.name.en} width={60} height={60}/>
        <div className="article-related-name">{article.contentWriter.nameDisplay} {article.contentWriter.groupId === 13 ? "(C) " : ""}</div>
      </div>

      <h2>{ t("article:related-article") }</h2>

      <div className="article-list-small article-list-related">
        { articleElms }
      </div>
    </div> 
  );
}

export default ArticleRelated;