const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    mode: process.env.NODE_ENV,
    disable: process.env.NODE_ENV === 'development'
  },
  // For next-pwa to support webpack 5
  future: {
    webpack5: true
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
});