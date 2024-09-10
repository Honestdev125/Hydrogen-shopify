import { flattenConnection } from "@shopify/hydrogen"
import type { ProductSortKeys } from "@shopify/hydrogen/storefront-api-types"
import { type LoaderFunctionArgs, json } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { API_ALL_PRODUCTS_QUERY } from "~/routes/($locale).api.products/graphql/api-all-products-query"

/**
 * Fetch a given set of products from the storefront API
 * @param count
 * @param query
 * @param reverse
 * @param sortKey
 * @returns Product[]
 * @see https://shopify.dev/api/storefront/current/queries/products
 */
export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url)

  const searchParams = new URLSearchParams(url.search)

  const query = searchParams.get("query") ?? ""

  const sortKey =
    (searchParams.get("sortKey") as null | ProductSortKeys) ?? "BEST_SELLING"

  let reverse = false

  try {
    const _reverse = searchParams.get("reverse")
    if (_reverse === "true") {
      reverse = true
    }
  } catch (_) {
    // noop
  }

  let count = 4

  try {
    const _count = searchParams.get("count")
    if (typeof _count === "string") {
      count = Number.parseInt(_count)
    }
  } catch (_) {
    // noop
  }

  const { products } = await context.storefront.query(API_ALL_PRODUCTS_QUERY, {
    variables: {
      count,
      query,
      reverse,
      sortKey,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
    cache: context.storefront.CacheLong(),
  })

  invariant(products, "No data returned from top products query")

  return json({
    products: flattenConnection(products),
  })
}

/**
 * no-op
 */
export default function ProductsApiRoute() {
  return null
}
