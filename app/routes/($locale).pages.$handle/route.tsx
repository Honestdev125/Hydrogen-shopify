import { useLoaderData } from "@remix-run/react"
import { type LoaderFunctionArgs, json } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { routeHeaders } from "~/data/cache"
import { seoPayload } from "~/lib/seo.server"
import { PAGE_QUERY } from "~/routes/($locale).pages.$handle/graphql/page-query"

export const headers = routeHeaders

export async function loader(props: LoaderFunctionArgs) {
  invariant(props.params.handle, "Missing page handle")

  const { page } = await props.context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: props.params.handle,
      language: props.context.storefront.i18n.language,
    },
  })

  if (!page) {
    throw new Response(null, { status: 404 })
  }

  const seo = seoPayload.page({ page, url: props.request.url })

  return json({ page, seo })
}

export default function Page() {
  const { page } = useLoaderData<typeof loader>()

  return (
    <main className="container space-y-4">
      <div
        className={"znc font-medium"}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </main>
  )
}
