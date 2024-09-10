import { COLLECTION_CONTENT_FRAGMENT } from "~/routes/($locale)._index/graphql/collection-content-fragment"

export const COLLECTION_HERO_QUERY = `#graphql
query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
@inContext(country: $country, language: $language) {
  hero: collection(handle: $handle) {
    ...CollectionContent
  }
}
${COLLECTION_CONTENT_FRAGMENT}
` as const
