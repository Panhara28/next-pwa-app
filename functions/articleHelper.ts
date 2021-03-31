import { Graph } from "../generated/graph";
import { parsedImage } from './Image';
var md5 = require('md5');

export const getArticleCategoryName = (article: Graph.Article) => {
  if(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) {
    return article.categoryNameSub.kh;
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

export const getArticleTitleSlug = (articleTitle: string) => {
  let titleSlug = articleTitle.toLocaleLowerCase().replaceAll(" ", "-").replaceAll("?", "");
  // Replace hidden space for khmer character &#8203;
  titleSlug = titleSlug.replaceAll("​", "");
  // Replace special characters
  titleSlug = titleSlug.replace(/[!@^=&\/\\#,+()$~%'":*?<>{}]/g, '');

  return encodeURIComponent(titleSlug);
}