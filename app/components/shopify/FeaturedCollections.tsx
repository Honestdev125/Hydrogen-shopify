import { Image } from "@shopify/hydrogen"

import type { HomepageFeaturedCollectionsQuery } from "storefrontapi.generated"
import { Grid, Heading, Link, Section } from "~/components/shopify"

type FeaturedCollectionsProps = HomepageFeaturedCollectionsQuery & {
  title?: string
  [key: string]: any
}

export function FeaturedCollections({
  collections,
  title = "Collections",
  ...props
}: FeaturedCollectionsProps) {
  const haveCollections = collections?.nodes?.length > 0
  if (!haveCollections) return null

  const collectionsWithImage = collections.nodes.filter((item) => item.image)

  return (
    <Section {...props} heading={title}>
      <Grid items={collectionsWithImage.length}>
        {collectionsWithImage.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-4">
                <div className="card-image aspect-[3/2] bg-primary/5">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      aspectRatio="3/2"
                    />
                  )}
                </div>
                <Heading size="copy">{collection.title}</Heading>
              </div>
            </Link>
          )
        })}
      </Grid>
    </Section>
  )
}
