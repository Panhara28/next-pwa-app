import React, { ReactNode } from 'react';
import { Graph } from '../../generated/graph';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleCategoryName, getArticleContentWriterProfilePiceture } from './../../functions/articleHelper';
import { parsedImage } from '../../functions/Image';
import { getElapseTime, getDateByFormat } from './../../functions/date';

const ArticleList = (articles: Graph.Article[]) => {
  const article_nodes: ReactNode[] = articles.map(article => {
    return (
      <div className="article-list-items" key={article.id}>
        <Link href={`/article/${article.id}`}>
          <a className="thumbnail">
            <Image src={parsedImage(article.thumbnail)} alt={article.thumbnail} width={350} height={185}/>
          </a>
        </Link>

        <div className="detail">
          <Link href={`/article/${article.id}`}><a><h3 className="title">{article.title}</h3></a></Link>
          <p className="title-sub">{article.summary}</p>
          <div className="category">{getArticleCategoryName(article)}</div>
          <div className="author">
            <Image src={getArticleContentWriterProfilePiceture(article)} alt={article.contentWriter.name.en} width={25} height={25}/>
            <div className="name">{article.contentWriter.nameDisplay}</div>
            <div><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}</div>
            <div>&nbsp;<i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="article-list">
      { article_nodes }
    </div>
  );
}

export default ArticleList;