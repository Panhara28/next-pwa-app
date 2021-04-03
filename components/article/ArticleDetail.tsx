import ArticleRelated from "./ArticleRelated";
import SEO from './../layout/SEO';
import ArticleLayout from './../layout/article/ArticleLayout';
import ArticleLayoutDetail from './../layout/article/ArticleLayoutDetail';
import ArticleContent from './ArticleContent';
import ArticleLayoutSide from './../layout/article/ArticleLayoutSide';
import { Graph } from "../../generated/graph";
import Image from "next/image";
import { parsedImage } from './../../functions/Image';
import { getArticleCategoryName } from './../../functions/articleHelper';
import { getDateByFormat, getElapseTime } from './../../functions/date';

const ArticleDetail = ({ article, articleRelated, pathname }: { article: Graph.Article, articleRelated: Graph.Article[], pathname: string }) => {
  return (
    <>
      <SEO 
        title={article.title}
        pathname={pathname}
        description={article.summary}
        type={"article"}
        image={article.thumbnail}
      />

      <ArticleLayout>
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
          <ArticleRelated article={article} articleRelated={articleRelated}/>
        </ArticleLayoutSide>
      </ArticleLayout>
    </>
  );
}

export default ArticleDetail;