import { useLoaderData } from "@remix-run/react"
import { Image } from "@shopify/hydrogen"
import { type LoaderFunctionArgs, json } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { routeHeaders } from "~/data/cache"
import { seoPayload } from "~/lib/seo.server"
import { ARTICLE_QUERY } from "~/routes/($locale).news.$handle/graphql/article-query"

const BLOG_HANDLE = "news"

export const headers = routeHeaders

export async function loader(props: LoaderFunctionArgs) {
  const { language, country } = props.context.storefront.i18n

  invariant(props.params.handle, "Missing journal handle")

  const { blog } = await props.context.storefront.query(ARTICLE_QUERY, {
    variables: {
      blogHandle: BLOG_HANDLE,
      articleHandle: props.params.handle,
      language,
    },
  })

  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 })
  }

  const article = blog.articleByHandle

  const intl = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedDate = intl.format(new Date(article?.publishedAt))

  const seo = seoPayload.article({ article, url: props.request.url })

  return json({ article, formattedDate, seo })
}

export default function ArticlePage() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="container space-y-4 pt-4">
      <header>
        <h1>{data.article.title}</h1>
        <p>{data.formattedDate}</p>
        <p>{data.article.author?.name}</p>
      </header>
      <section>
        {data.article.image && (
          <Image data={data.article.image} sizes="90vw" loading="eager" />
        )}
        <div
          className={"znc font-medium"}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: data.article.contentHtml }}
        />
      </section>
    </main>
  )
}
