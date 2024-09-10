import { LoaderFunctionArgs } from "@shopify/remix-oxygen"
import { getFeaturedData } from "~/functions/get-featured-data"
import { PAGINATION_SIZE } from "~/lib/const"

type Storefront = LoaderFunctionArgs["context"]["storefront"]

export function getNoResultRecommendations(storefront: Storefront) {
  return getFeaturedData(storefront, { pageBy: PAGINATION_SIZE })
}
