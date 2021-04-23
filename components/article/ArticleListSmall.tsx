import React, { ReactNode } from 'react';
import { Graph } from '../../generated/graph';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleContentWriterProfilePiceture } from '../../functions/articleHelper';
import { parsedImage } from '../../functions/Image';
import { getElapseTime, getDateByFormat } from '../../functions/date';
import { getArticleCategoryName } from './../../functions/articleHelper';

const ArticleListSmall = ({ articles }: { articles: Graph.Article[] }) => {
  const articleNodes: ReactNode[] = articles.map(article => {
    return (
      <div className="article-list-small-item" key={article.id}>
        <Link href={`/article/${article.id}`}>
          <a className="article-list-small-item-thumbnail">
            <Image src={parsedImage(article.thumbnail, 1200, 630)} alt={article.thumbnail} width={350} height={185}/>
          </a>
        </Link>

        <div className="article-list-small-item-detail">
          <Link href={`/article/${article.id}`}><a><h4 className="article-list-small-item-detail-title">{article.title}</h4></a></Link>

          <div className="article-list-small-item-detail-author">
            <div className="article-list-small-item-detail-author-category">{getArticleCategoryName(article)}</div>
            <Image src={getArticleContentWriterProfilePiceture(article, 256, 256)} alt={article.contentWriter.name.en} width={25} height={25}/>
            <div className="article-list-small-item-detail-author-name">{article.contentWriter.nameDisplay} {article.contentWriter.groupId === 13 ? "(C) " : ""}</div>
          </div>

          <div className="article-list-small-item-detail-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}&nbsp;</div>
          <div className="article-list-small-item-detail-datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="article-list-small">
      { articleNodes }
    </div>
  );
}

export default ArticleListSmall;