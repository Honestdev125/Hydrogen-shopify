import { Link, useLoaderData } from "@remix-run/react"
import {
  AnalyticsPageType,
  Pagination,
  flattenConnection,
  getPaginationVariables,
} from "@shopify/hydrogen"
import { type LoaderFunctionArgs, json } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { Button } from "~/components/ui/button"
import { routeHeaders } from "~/data/cache"
import { PAGINATION_SIZE } from "~/lib/const"
import { seoPayload } from "~/lib/seo.server"
import { COLLECTION_QUERY } from "~/routes/($locale).collections.$handle/graphql/collection-query"
import { ProductCard } from "~/routes/($locale).products._index/components/product-card"

export const headers = routeHeaders

export async function loader(props: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(props.request, {
    pageBy: PAGINATION_SIZE,
  })

  invariant(props.params.handle, "Missing params.handle param")

  const data = await props.context.storefront.query(COLLECTION_QUERY, {
    variables: {
      ...paginationVariables,
      handle: props.params.handle,
      filters: [],
      sortKey: "BEST_SELLING",
      reverse: false,
      country: props.context.storefront.i18n.country,
      language: props.context.storefront.i18n.language,
    },
  })

  if (!data.collection) {
    throw new Response("collection", { status: 404 })
  }

  const seo = seoPayload.collection({
    collection: data.collection,
    url: props.request.url,
  })

  return json({
    seo,
    collection: data.collection,
    collections: flattenConnection(data.collections),
    analytics: {
      pageType: AnalyticsPageType.collection,
      collectionHandle: data.collection.handle,
      resourceId: data.collection.id,
    },
  })
}

export default function Collection() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="container space-y-4 pt-4">
      <header>
        <h1>{data.collection.title}</h1>
        {data.collection?.description && <p>{data.collection.description}</p>}
      </header>
      <section>
        <Pagination connection={data.collection.products}>
          {(context) => (
            <>
              <context.PreviousLink>
                <Button variant="secondary">
                  {context.isLoading ? "Loading..." : "Load previous"}
                </Button>
              </context.PreviousLink>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:px-16">
                {context.nodes.map((product) => (
                  <Link key={product.id} to={`/products/${product.handle}`}>
                    <ProductCard product={product} key={product.id} />
                  </Link>
                ))}
              </ul>
              <context.NextLink>
                <Button variant="secondary">
                  {context.isLoading ? "Loading..." : "Load more products"}
                </Button>
              </context.NextLink>
            </>
          )}
        </Pagination>
      </section>
    </main>
  )
}
