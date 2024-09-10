type Props = {
  url: string
}

export function toRobotsTxt(props: Props) {
  const sitemapUrl = props.url ? `${props.url}/sitemap.xml` : undefined

  return `
User-agent: *
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /account
${sitemapUrl ? `Sitemap: ${sitemapUrl}` : ""}

# Google adsbot ignores robots.txt unless specifically named!
User-agent: adsbot-google
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /orders

User-agent: Pinterest
Crawl-delay: 1
`.trim()
}
