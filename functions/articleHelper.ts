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

export const getArticleContentWriterProfilePiceture = (article: Graph.Article) => {
  if(article.contentWriter.profilePicture) {
    return parsedImage(article.contentWriter.profilePicture);
  } else {
    return `https://www.gravatar.com/avatar/${md5(article.contentWriter.name.en)}?s=100&d=retro&r=PG`;
  }
}