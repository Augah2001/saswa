/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.saswa25.org/', // Replace with your actual site URL
  generateRobotsTxt: true, // (optional)
  // ...other options
  // You can add more configuration here, for example, to exclude specific pages:
  // exclude: ['/server-sitemap.xml'], // <= exclude here
  // robotsTxtOptions: {
  //   additionalSitemaps: [
  //     'https://example.com/server-sitemap.xml', // <= Add here
  //   ],
  // },
};
