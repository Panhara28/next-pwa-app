module.exports = {
  locales: ['en', 'km', 'my', 'vi'],
  defaultLocale: process.env.LOCALE,
  localeDetection: false,
  pages: {
    "*": ["common"],
    "/article/[articleId]/[articleTitleSlug]": ["article"]
  }
}