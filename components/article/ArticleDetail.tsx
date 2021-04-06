import ArticleLayout from './../layout/article/ArticleLayout';
import ArticleLayoutDetail from './../layout/article/ArticleLayoutDetail';
import ArticleContent from './ArticleContent';
import ArticleLayoutSide from './../layout/article/ArticleLayoutSide';
import { Graph } from "../../generated/graph";
import Image from "next/image";
import { parsedImage } from './../../functions/Image';
import { getArticleCategoryName, getArticleTitleSlug } from './../../functions/articleHelper';
import { getDateByFormat, getElapseTime } from './../../functions/date';
import SEO from './../layout/SEO';
import ArticleTracker from "./ArticleTracker";
import ArticleRelated from "./ArticleRelated";

const ArticleDetail = ({ article, articleRelated }: { article: Graph.Article, articleRelated: Graph.Article[] }) => {
  const pathname = `/article/${article.id}`;
  const canonical = pathname + `/${getArticleTitleSlug(article.title)}`;

  return (
    <ArticleTracker articleID={article.id}>
      <ArticleLayout>
        <SEO 
          title={article.title}
          pathname={pathname}
          canonical={canonical}
          description={article.summary}
          type={"article"}
          image={article.thumbnail}
        />

        <ArticleLayoutDetail>
          <h1 className="title">{ article.title }</h1>
          <div className="thumbnail"><Image src={parsedImage(article.thumbnail, 1200, 630)} alt={article.thumbnail} width={420} height={220}/></div>
          <div className="summary">
            <div className="category">{getArticleCategoryName(article)}</div>
            <span className="datetime"><i className="fal fa-calendar-alt"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "DD-MMM-YYYY")}</span>
            <span className="datetime"><i className="fal fa-clock"></i>&nbsp;{getDateByFormat(article.publishedDateTime.en, "ha")}&nbsp;·&nbsp;{getElapseTime(article.publishedDateTime.en)}</span>
            <p className="title-sub">{article.summary}</p>
          </div>

          <ArticleContent article={article}/>
        </ArticleLayoutDetail>
        <ArticleLayoutSide>
          <ArticleRelated article={article} articles={articleRelated}/>
        </ArticleLayoutSide>
      </ArticleLayout>
    </ArticleTracker>
  );
}

export default ArticleDetail;