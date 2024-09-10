import { Link, useLoaderData } from "@remix-run/react"
import { flattenConnection } from "@shopify/hydrogen"
import { type LoaderFunctionArgs, json } from "@shopify/remix-oxygen"
import { routeHeaders } from "~/data/cache"
import { PAGINATION_SIZE, getImageLoadingPriority } from "~/lib/const"
import { seoPayload } from "~/lib/seo.server"
import { ArticleCard } from "~/routes/($locale).news._index/components/article-card"
import { BLOGS_QUERY } from "~/routes/($locale).news._index/graphql/blogs-query"

const BLOG_HANDLE = "news"

export const headers = routeHeaders

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const { language, country } = context.storefront.i18n

  const data = await context.storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: BLOG_HANDLE,
      pageBy: PAGINATION_SIZE,
      language,
    },
  })

  if (!data.blog) {
    throw new Response("Not found", { status: 404 })
  }

  const intl = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const nodes = flattenConnection(data.blog.articles)

  const articles = nodes.map((article) => {
    const date = new Date(article.publishedAt)
    const publishedAt = intl.format(date)
    return { ...article, publishedAt }
  })

  const seo = seoPayload.blog({ blog: data.blog, url: request.url })

  return json({ articles, seo })
}

export default function NewsHandle() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="container space-y-4 pt-4">
      <header>
        <h1>{"お知らせ"}</h1>
      </header>
      <section>
        <ul>
          {data.articles.map((post, i) => (
            <li key={post.id}>
              <Link to={`/${BLOG_HANDLE}/${post.handle}`}>
                <ArticleCard
                  blogHandle={BLOG_HANDLE.toLowerCase()}
                  article={post}
                  key={post.id}
                  loading={getImageLoadingPriority(i, 2)}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
