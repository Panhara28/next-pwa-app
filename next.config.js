const nextTranslate = require('next-translate');

module.exports = {
  ...nextTranslate(),
  images: {
    domains: [
      's1.kh1.co',
      's2.kh1.co',
      's3.kh1.co',
      's4.kh1.co',
      's5.kh1.co',
      's6.kh1.co',
      's7.kh1.co',
      's8.kh1.co',
      's9.kh1.co',
      's10.kh1.co',
      's11.kh1.co',
      'www.gravatar.com'
    ],
  },
  sassOptions: {
    additionalData: `
      $color-primary: ${process.env.NEXT_PUBLIC_COLOR_PRIMARY};
      $color-secondary: ${process.env.NEXT_PUBLIC_COLOR_SECONDARY};
    `
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
}