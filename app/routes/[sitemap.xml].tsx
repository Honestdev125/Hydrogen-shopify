import type { LoaderFunctionArgs } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { shopSitemap } from "~/lib/sitemap/shop-sitemap"
import { SITEMAP_QUERY } from "~/routes/($locale)/graphql/sitemap-query"

/**
 * the google limit is 50K, however, SF API only allow querying for 250 resources each time
 */
const MAX_URLS = 250

export async function loader(props: LoaderFunctionArgs) {
  const data = await props.context.storefront.query(SITEMAP_QUERY, {
    variables: {
      urlLimits: MAX_URLS,
      language: props.context.storefront.i18n.language,
    },
  })

  invariant(data, "Sitemap data is missing")

  return new Response(
    shopSitemap({ data, baseUrl: new URL(props.request.url).origin }),
    {
      headers: {
        "content-type": "application/xml",
        // Cache for 24 hours
        "cache-control": `max-age=${60 * 60 * 24}`,
      },
    },
  )
}
