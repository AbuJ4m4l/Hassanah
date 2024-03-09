const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com', 'picsum.photos']
  }
});