import type { LoaderFunctionArgs } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { FEATURED_ITEMS_QUERY } from "~/routes/($locale).featured-products/graphql/featured-items-query"

export async function getFeaturedData(
  storefront: LoaderFunctionArgs["context"]["storefront"],
  variables: { pageBy?: number } = {},
) {
  const data = await storefront.query(FEATURED_ITEMS_QUERY, {
    variables: {
      pageBy: 12,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
      ...variables,
    },
  })

  invariant(data, "No featured items data returned from Shopify API")

  return data
}
