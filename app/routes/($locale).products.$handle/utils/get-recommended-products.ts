import type { Storefront } from "@shopify/hydrogen"
import invariant from "tiny-invariant"
import { PRODUCT_CARD_FRAGMENT } from "~/data/fragments"

export async function getRecommendedProducts(
  storefront: Storefront,
  productId: string,
) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: { productId, count: 12 },
  })

  invariant(products, "No data returned from Shopify API")

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    )

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  )

  mergedProducts.splice(originalProduct, 1)

  return { nodes: mergedProducts }
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const
