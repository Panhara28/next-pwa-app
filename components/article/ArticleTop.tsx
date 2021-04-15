import Image from "next/image";
import Link from "next/link";
import { Graph } from "../../generated/graph";
import { parsedImage } from './../../functions/Image';
import { getArticleTitleSlug, getArticleCategoryName, getArticleContentWriterProfilePiceture } from './../../functions/articleHelper';
import { getDateByFormat, getElapseTime } from './../../functions/date';

const ArticleTop = ({ articleTop }: { articleTop: Graph.Article[] }) => {
  const articleFirst = articleTop[0] ? articleTop[0] : null;
  const articleSecond = articleTop[1] ? articleTop[1] : null;
  const articleThird = articleTop[2] ? articleTop[2] : null;
  const articleFourth = articleTop[3] ? articleTop[3] : null;
  const articleFifth = articleTop[4] ? articleTop[4] : null;

  return(
    <div className="article-top-grid">
      <div className="grid-article-top-first article-top-big">
        <div className="article-top-big-wrapper">
          <Link href={`/article/${articleFirst.id}/${getArticleTitleSlug(articleFirst.title)}`}>
            <a>
              <Image src={parsedImage(articleFirst.thumbnail, 1200, 630)} alt={articleFirst.thumbnail} width={800} height={420}/>
            </a>
          </Link>

          <div className="article-top-big-absolute">
            <Link href={`/article/${articleFirst.id}/${getArticleTitleSlug(articleFirst.title)}`}>
              <a>
                <h2 className="article-top-big-title">{articleFirst.title}</h2>
              </a>
            </Link>
            
            <div className="article-top-big-detail">
              <div className="article-top-big-detail-category">{getArticleCategoryName(articleFirst)}</div>
              <Image src={getArticleContentWriterProfilePiceture(articleFirst, 256, 256)} alt={articleFirst.contentWriter.name.en} width={25} height={25}/>
              <div className="article-top-big-detail-author-name">{articleFirst.contentWriter.nameDisplay} {articleFirst.contentWriter.groupId === 13 ? "(C) " : ""}</div>
              <div className="article-top-big-detail-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(articleFirst.publishedDateTime.en, "DD-MMM-YYYY")}</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="grid-article-top-second article-top-card">
        <Link href={`/article/${articleSecond.id}/${getArticleTitleSlug(articleSecond.title)}`}>
          <a>
            <Image src={parsedImage(articleSecond.thumbnail, 1200, 630)} alt={articleSecond.thumbnail} width={800} height={420}/>
          </a>
        </Link>
        
        <div className="article-top-card-detail">
          <Link href={`/article/${articleSecond.id}/${getArticleTitleSlug(articleSecond.title)}`}><a><h3 className="article-top-card-detail-title">{articleSecond.title}</h3></a></Link>
          <p className="article-top-card-detail-title-sub">{articleSecond.summary}</p>

          <div className="article-top-card-detail-small">
            <div className="article-top-card-detail-small-category">{getArticleCategoryName(articleSecond)}</div>
            <Image src={getArticleContentWriterProfilePiceture(articleSecond, 256, 256)} alt={articleSecond.contentWriter.name.en} width={25} height={25}/>
            <div className="article-top-card-detail-small-author-name">{articleSecond.contentWriter.nameDisplay} {articleSecond.contentWriter.groupId === 13 ? "(C) " : ""}</div>
            <div className="article-top-card-detail-small-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(articleSecond.publishedDateTime.en, "DD-MMM-YYYY")}</div>
          </div>
        </div>
      </div>

      <div className="grid-article-top-third article-top-card">
        <Link href={`/article/${articleThird.id}/${getArticleTitleSlug(articleThird.title)}`}>
          <a>
            <Image src={parsedImage(articleThird.thumbnail, 1200, 630)} alt={articleThird.thumbnail} width={800} height={420}/>
          </a>
        </Link>

        <div className="article-top-card-detail">
          <Link href={`/article/${articleThird.id}/${getArticleTitleSlug(articleThird.title)}`}><a><h3 className="article-top-card-detail-title">{articleThird.title}</h3></a></Link>
          <p className="article-top-card-detail-title-sub">{articleThird.summary}</p>

          <div className="article-top-card-detail-small">
            <div className="article-top-card-detail-small-category">{getArticleCategoryName(articleThird)}</div>
            <Image src={getArticleContentWriterProfilePiceture(articleThird, 256, 256)} alt={articleThird.contentWriter.name.en} width={25} height={25}/>
            <div className="article-top-card-detail-small-author-name">{articleThird.contentWriter.nameDisplay} {articleThird.contentWriter.groupId === 13 ? "(C) " : ""}</div>
            <div className="article-top-card-detail-small-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(articleThird.publishedDateTime.en, "DD-MMM-YYYY")}</div>
          </div>
        </div>
      </div>

      <div  className="grid-article-top-fourth article-top-card">
        <Link href={`/article/${articleFourth.id}/${getArticleTitleSlug(articleFourth.title)}`}>
          <a>
            <Image src={parsedImage(articleFourth.thumbnail, 1200, 630)} alt={articleFourth.thumbnail} width={800} height={420}/>
          </a>
        </Link>

        <div className="article-top-card-detail">
          <Link href={`/article/${articleFourth.id}/${getArticleTitleSlug(articleFourth.title)}`}><a><h3 className="article-top-card-detail-title">{articleFourth.title}</h3></a></Link>
          <p className="article-top-card-detail-title-sub">{articleFourth.summary}</p>

          <div className="article-top-card-detail-small">
            <div className="article-top-card-detail-small-category">{getArticleCategoryName(articleFourth)}</div>
            <Image src={getArticleContentWriterProfilePiceture(articleFourth, 256, 256)} alt={articleFourth.contentWriter.name.en} width={25} height={25}/>
            <div className="article-top-card-detail-small-author-name">{articleFourth.contentWriter.nameDisplay} {articleFourth.contentWriter.groupId === 13 ? "(C) " : ""}</div>
            <div className="article-top-card-detail-small-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(articleFourth.publishedDateTime.en, "DD-MMM-YYYY")}</div>
          </div>
        </div>
      </div>

      <div className="grid-article-top-fifth article-top-card">
        <Link href={`/article/${articleFifth.id}/${getArticleTitleSlug(articleFifth.title)}`}>
          <a>
            <Image src={parsedImage(articleFifth.thumbnail, 1200, 630)} alt={articleFifth.thumbnail} width={800} height={420}/>
          </a>
        </Link>

        <div className="article-top-card-detail">
          <Link href={`/article/${articleFifth.id}/${getArticleTitleSlug(articleFifth.title)}`}><a><h3 className="article-top-card-detail-title">{articleFifth.title}</h3></a></Link>
          <p className="article-top-card-detail-title-sub">{articleFifth.summary}</p>

          <div className="article-top-card-detail-small">
            <div className="article-top-card-detail-small-category">{getArticleCategoryName(articleFifth)}</div>
            <Image src={getArticleContentWriterProfilePiceture(articleFifth, 256, 256)} alt={articleFifth.contentWriter.name.en} width={25} height={25}/>
            <div className="article-top-card-detail-small-author-name">{articleFifth.contentWriter.nameDisplay} {articleFifth.contentWriter.groupId === 13 ? "(C) " : ""}</div>
            <div className="article-top-card-detail-small-datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(articleFifth.publishedDateTime.en, "DD-MMM-YYYY")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleTop;