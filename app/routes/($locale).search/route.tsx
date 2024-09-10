import { Form, Link, useLoaderData } from "@remix-run/react"
import { Pagination, getPaginationVariables } from "@shopify/hydrogen"
import { type LoaderFunctionArgs, defer } from "@shopify/remix-oxygen"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { getFeaturedData } from "~/functions/get-featured-data"
import { PAGINATION_SIZE, getImageLoadingPriority } from "~/lib/const"
import { seoPayload } from "~/lib/seo.server"
import { ProductCard } from "~/routes/($locale).products._index/components/product-card"
import { NoResults } from "~/routes/($locale).search/components/no-results"
import { SEARCH_QUERY } from "~/routes/($locale).search/graphql/search-query"
import { getNoResultRecommendations } from "~/routes/($locale).search/utils/get-no-result-recommendations"

export type FeaturedData = Awaited<ReturnType<typeof getFeaturedData>>

export async function loader(props: LoaderFunctionArgs) {
  const searchParams = new URL(props.request.url).searchParams

  const searchTerm = searchParams.get("q")

  const variables = getPaginationVariables(props.request, {
    pageBy: PAGINATION_SIZE,
  })

  const data = await props.context.storefront.query(SEARCH_QUERY, {
    variables: {
      searchTerm,
      ...variables,
      country: props.context.storefront.i18n.country,
      language: props.context.storefront.i18n.language,
    },
  })

  const shouldGetRecommendations =
    !searchTerm || data.products?.nodes?.length === 0

  const seo = seoPayload.collection({
    url: props.request.url,
    collection: {
      id: "search",
      title: "Search",
      handle: "search",
      descriptionHtml: "Search results",
      description: "Search results",
      seo: {
        title: "Search",
        description: `Showing ${data.products.nodes.length} search results for "${searchTerm}"`,
      },
      metafields: [],
      products: data.products,
      updatedAt: new Date().toISOString(),
    },
  })

  return defer({
    seo,
    searchTerm,
    products: data.products,
    noResultRecommendations: shouldGetRecommendations
      ? getNoResultRecommendations(props.context.storefront)
      : Promise.resolve(null),
  })
}

export default function SearchPage() {
  const data = useLoaderData<typeof loader>()

  const noResults = data.products?.nodes?.length === 0

  return (
    <main className="container space-y-4 pt-4">
      <header>
        <h1>{"検索結果"}</h1>
      </header>
      <Form method="get">
        <div className="flex gap-x-2">
          <Input name="q" placeholder="Search…" type="search" />
          <Button type="submit">{"検索"}</Button>
        </div>
      </Form>
      {noResults && data.searchTerm && (
        <NoResults recommendations={data.noResultRecommendations} />
      )}
      {!noResults && (
        <Pagination connection={data.products}>
          {(context) => {
            return (
              <section className="space-y-4">
                <context.PreviousLink className="block">
                  <Button className="w-full" variant={"secondary"}>
                    {context.isLoading ? "Loading..." : "Previous"}
                  </Button>
                </context.PreviousLink>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:px-16">
                  {context.nodes.map((product, i) => (
                    <li key={product.id}>
                      <Link to={`/products/${product.handle}`}>
                        <ProductCard
                          product={product}
                          loading={getImageLoadingPriority(i)}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <context.NextLink className="block">
                  <Button className="w-full" variant={"secondary"}>
                    {context.isLoading ? "Loading..." : "Next"}
                  </Button>
                </context.NextLink>
              </section>
            )
          }}
        </Pagination>
      )}
    </main>
  )
}
