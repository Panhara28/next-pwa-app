import React, { ReactNode } from 'react';
import { Graph } from '../../generated/graph';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleTitleSlug } from '../../functions/articleHelper';
import { parsedImage } from '../../functions/Image';
import { getElapseTime, getDateByFormat } from '../../functions/date';

const ArticleListRelated = (articles: Graph.Article[]) => {
  const article_nodes: ReactNode[] = articles.map(article => {
    return (
      <div className="article-list-items" key={article.id}>
        <Link href={`/article/${article.id}/${getArticleTitleSlug(article.title)}`}>
          <a className="thumbnail">
            <Image src={parsedImage(article.thumbnail, 1200, 630)} alt={article.thumbnail} width={350} height={185}/>
          </a>
        </Link>

        <div className="detail">
          <Link href={`/article/${article.id}/${getArticleTitleSlug(article.title)}`}><a><h3 className="title">{article.title}</h3></a></Link>
          <div className="datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}&nbsp;</div>
          <div className="datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="article-list small">
      { article_nodes }
    </div>
  );
}

export default ArticleListRelated;