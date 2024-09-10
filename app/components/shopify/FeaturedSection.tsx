import { useFetcher } from "@remix-run/react"
import { useEffect } from "react"
import { getFeaturedData } from "~/functions/get-featured-data"
import { usePrefixPathWithLocale } from "~/lib/utils"
import { FeaturedCollections } from "./FeaturedCollections"
import { ProductSwimlane } from "./ProductSwimlane"

type FeaturedData = Awaited<ReturnType<typeof getFeaturedData>>

export function FeaturedSection() {
  const { load, data } = useFetcher<FeaturedData>()
  const path = usePrefixPathWithLocale("/featured-products")

  useEffect(() => {
    load(path)
  }, [load, path])

  if (!data) return null

  const { featuredCollections, featuredProducts } = data

  return (
    <>
      {featuredCollections.nodes.length < 2 && (
        <FeaturedCollections
          title="Popular Collections"
          collections={featuredCollections}
        />
      )}
      <ProductSwimlane products={featuredProducts} />
    </>
  )
}
