import React, { ReactNode } from 'react';
import { Graph } from '../../generated/graph';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleContentWriterProfilePiceture } from '../../functions/articleHelper';
import { parsedImage } from '../../functions/Image';
import { getElapseTime, getDateByFormat } from '../../functions/date';
import useTranslation from 'next-translate/useTranslation';

const ArticleRelated = ({ article, articles }: { article: Graph.Article, articles: Graph.Article[] }) => {
  const { t } = useTranslation();

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
          <div className="article-list-small-item-detail-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}&nbsp;</div>
          <div className="article-list-small-item-detail-datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="article-related">
      <div className="article-related-author">
        <Image src={getArticleContentWriterProfilePiceture(article, 256, 256)} alt={article.contentWriter.name.en} width={60} height={60}/>
        <div className="article-related-name">{article.contentWriter.nameDisplay} {article.contentWriter.groupId === 13 ? "(C) " : ""}</div>
      </div>

      <h2>{ t("article:related-article") }</h2>

      <div className="article-list-small article-list-related">
        { articleNodes }
      </div>
    </div> 
  );
}

export default ArticleRelated;