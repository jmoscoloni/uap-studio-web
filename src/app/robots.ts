export default function robots() {
  const isStaging = process.env.IS_STAGING;
  return {
    rules: {
      userAgent: '*',
      [isStaging ? 'disallow' : 'allow']: '/'
    },
    sitemap: process.env.NEXT_PUBLIC_DOMAIN + '/sitemap.xml'
  };
}
