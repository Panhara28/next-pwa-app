module.exports = {
  locales: ['en', 'km', 'my', 'vi'],
  defaultLocale: process.env.LOCALE,
  localeDetection: false,
  pages: {
    "*": ["common", "error"],
    "/article/[articleId]/[[...articleTitleSlug]]": ["article"]
  },
  logBuild: false
}