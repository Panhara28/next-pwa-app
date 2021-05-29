import { gql } from '@apollo/client';

const QUERY_CATEGORY = gql`
  query Category($categorySlug: String) {
    category(categorySlug: $categorySlug) {
      alias, 
      name {
        kh
      }
    }
  }
`;

const QUERY_CATEGORY_LIST = gql`
  query CategoryList($pagination: PaginationInput!, $parentId: Int, $published: Boolean, $display: Boolean, $exceptCategories: [Int]) {
    categoryList(pagination: $pagination, parentId: $parentId, published: $published, display: $display, exceptCategories: $exceptCategories) {
      data {
        id, alias, name {
          kh
        }
      }
      
      page {
        total, current, size
      }
    }
  }
`;

const QUERY_ARTICLE = gql`
  query article($id: Int!) {
    article(id: $id) {
      id
      title
      content
      audio
      summary
      nextId
      categoryId
      categorySlug
      categorySubId
      categoryName {
        kh
      }
      categoryNameSub {
        kh
      }
      publishedDateTime {
        en
      }
      thumbnail
      contentWriter {
        id
        groupId
        profilePicture
        nameDisplay
        username
        name {
          en
        }
      }
      format
      siteId
    }
  }
`;


const QUERY_ARTICLE_LATEST = gql`
  query ArticleList($pagination: PaginationInput!, $filter: ArticleFilterInput, $sort: ArticleSortEnum) {
    articleList(pagination: $pagination, filter: $filter, sort: $sort) {
      data {
        id
        title
        summary
        thumbnail
        audio
        categoryName {
          kh
        }
        categoryNameSub {
          kh
        }
        contentWriter {
          name {
            en
          }
          nameDisplay
          profilePicture
          groupId
        }     
        publishedDateTime {
          en
        } 
        pageview
      }
    }
  }
`;

const QUERY_ARTICLE_WEEKLY = gql`
  query ArticleList($pagination: PaginationInput!, $filter: ArticleFilterInput, $sort: ArticleSortEnum) {
    articleList(pagination: $pagination, filter: $filter, sort: $sort) {
      data {
        id
        title
        thumbnail 
        audio
        publishedDateTime {
          en
        } 
      }
    }
  }
`;

const QUERY_ARTICLE_RELATED = gql`
  query ArticleList($pagination: PaginationInput!, $filter: ArticleFilterInput, $sort: ArticleSortEnum) {
    articleList(pagination: $pagination, filter: $filter, sort: $sort) {
      data {
        id
        title
        thumbnail 
        audio
        publishedDateTime {
          en
        } 
      }
    }
  }
`;

export const graphQuery = {
  QUERY_CATEGORY,
  QUERY_CATEGORY_LIST,
  QUERY_ARTICLE,
  QUERY_ARTICLE_LATEST,
  QUERY_ARTICLE_RELATED,
  QUERY_ARTICLE_WEEKLY
}