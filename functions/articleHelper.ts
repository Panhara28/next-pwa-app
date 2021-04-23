import { Graph } from "../generated/graph";
import { parsedImage } from './Image';
var md5 = require('md5');

export const getArticleCategoryName = (article: Graph.Article) => {
  if(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) {
    return article.categoryNameSub.kh || article.categoryName.kh;
  } else {
    return article.categoryName.kh;
  }
}

export const getArticleContentWriterProfilePiceture = (article: Graph.Article, width: number, height: number) => {
  if(article.contentWriter.profilePicture) {
    return parsedImage(article.contentWriter.profilePicture, width, height);
  } else {
    return `https://www.gravatar.com/avatar/${md5(article.contentWriter.name.en)}?s=100&d=retro&r=PG`;
  }
}

export const sortArticle = (articles: Graph.Article[]) => {
  let articleList = [...articles];
  
  // Sort by pageview
  articleList.sort((a, b) => b.pageview - a.pageview);

  // Get top 5 and remove from the list
  const articleTop5 = articleList.splice(0, 5);

  // Sort back by publish date time normally
  articleList.sort((a, b) => {
    return new Date(b.publishedDateTime.en).valueOf() - new Date(a.publishedDateTime.en).valueOf();
  });

  return [ articleTop5, articleList ];
}