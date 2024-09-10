import {
  FEATURED_COLLECTION_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
} from "~/data/fragments"

export const FEATURED_ITEMS_QUERY = `#graphql
query FeaturedItems(
  $country: CountryCode
  $language: LanguageCode
  $pageBy: Int = 12
) @inContext(country: $country, language: $language) {
  featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {
    nodes {
      ...FeaturedCollectionDetails
    }
  }
  featuredProducts: products(first: $pageBy) {
    nodes {
      ...ProductCard
    }
  }
}

${PRODUCT_CARD_FRAGMENT}
${FEATURED_COLLECTION_FRAGMENT}
` as const
