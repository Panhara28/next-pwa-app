import Image from "next/image";
import Link from "next/link";
import { Graph } from "../../generated/graph";
import { parsedImage } from './../../functions/Image';
import { getArticleCategoryName, getArticleContentWriterProfilePiceture } from './../../functions/articleHelper';
import { getDateByFormat, getElapseTime } from './../../functions/date';

const ArticleTop = ({ articleTop }: { articleTop: Graph.Article[] }) => {
  const articleOrder = ["first", "second", "third", "fourth", "fifth"];
  const articleTopOne = articleTop[0] ? 
    <article className="grid-article-top-first article-top-big">
      <div className="article-top-big-wrapper">
        <Link href={`/article/${articleTop[0].id}`}>
          <a>
            <Image src={parsedImage(articleTop[0].thumbnail, 1200, 630)} alt={articleTop[0].thumbnail} width={800} height={420}/>
          </a>
        </Link>

        <div className="article-top-big-absolute">
          <Link href={`/article/${articleTop[0].id}`}>
            <a>
              <h2 className="article-top-big-title">{articleTop[0].title}</h2>
            </a>
          </Link>
          
          <div className="article-top-big-detail">
            <div className="article-top-big-detail-category">{getArticleCategoryName(articleTop[0])}</div>
            <Image src={getArticleContentWriterProfilePiceture(articleTop[0], 256, 256)} alt={articleTop[0].contentWriter.name.en} width={25} height={25}/>
            <div className="article-top-big-detail-author-name">{articleTop[0].contentWriter.nameDisplay} {articleTop[0].contentWriter.groupId === 13 ? "(C) " : ""}</div>
            <div className="article-top-big-detail-break"></div>
            <div className="article-top-big-detail-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(articleTop[0].publishedDateTime.en, "DD-MMM-YYYY")}&nbsp;</div>
            <div className="article-top-big-detail-datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(articleTop[0].publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(articleTop[0].publishedDateTime.en)}</div>
          </div>
        </div>
      </div>
    </article> : null;

  const articleTopFour = articleTop.map((article, inx) => {
    // Ignore first article as it already include in the top
    if(inx === 0) return null;

    return(
      <article key={inx} className={`grid-article-top-${articleOrder[inx]} article-top-card`}>
        <Link href={`/article/${article.id}`}>
          <a>
            <Image src={parsedImage(article.thumbnail, 1200, 630)} alt={article.thumbnail} width={800} height={420}/>
          </a>
        </Link>
        
        <div className="article-top-card-detail">
          <Link href={`/article/${article.id}`}><a><h3 className="article-top-card-detail-title">{article.title}</h3></a></Link>
          <p className="article-top-card-detail-title-sub">{article.summary}</p>

          <div className="article-top-card-detail-small">
            <div className="article-top-card-detail-small-category">{getArticleCategoryName(article)}</div>
            <Image src={getArticleContentWriterProfilePiceture(article, 256, 256)} alt={article.contentWriter.name.en} width={25} height={25}/>
            <div className="article-top-card-detail-small-author-name">{article.contentWriter.nameDisplay} {article.contentWriter.groupId === 13 ? "(C) " : ""}</div>
            <div className="article-top-card-detail-small-break"></div>
            <div className="article-top-card-detail-small-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}&nbsp;</div>
            <div className="article-top-card-detail-small-datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</div>
          </div>
        </div>
      </article>
    );
  });

  return(
    <div className="article-top-grid">
      {articleTopOne}
      {articleTopFour}
    </div>
  );
}

export default ArticleTop;