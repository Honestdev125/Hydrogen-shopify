import { Await, Link, useLoaderData } from "@remix-run/react"
import { AnalyticsPageType } from "@shopify/hydrogen"
import { type LoaderFunctionArgs, defer } from "@shopify/remix-oxygen"
import { Suspense } from "react"
import { routeHeaders } from "~/data/cache"
import { seoPayload } from "~/lib/seo.server"
import { HomeAboutAvatar } from "~/routes/($locale)._index/components/home-about-avatar"
import { HomeAboutCustom } from "~/routes/($locale)._index/components/home-about-custom"
import { HomeAboutUs } from "~/routes/($locale)._index/components/home-about-us"
import { HomeFirstView } from "~/routes/($locale)._index/components/home-first-view"
import { HomeInstagram } from "~/routes/($locale)._index/components/home-instagram"
import { HomeItemCategory } from "~/routes/($locale)._index/components/home-item-category"
import { HomeRecommended } from "~/routes/($locale)._index/components/home-recommended"
import { HomeStore } from "~/routes/($locale)._index/components/home-store"
import { RecommendedProductCard } from "~/routes/($locale)._index/components/recommended-product-card"
import { FEATURED_COLLECTIONS_QUERY } from "~/routes/($locale)._index/graphql/featured-collection-query"
import { HOMEPAGE_FEATURED_PRODUCTS_QUERY } from "~/routes/($locale)._index/graphql/homepage-featured-products-query"
import { HOMEPAGE_SEO_QUERY } from "~/routes/($locale)._index/graphql/homepage-seo-query"

export const headers = routeHeaders

export async function loader(props: LoaderFunctionArgs) {
  const { language, country } = props.context.storefront.i18n

  const data = await props.context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: { handle: "freestyle" },
  })

  const seo = seoPayload.home()

  return defer({
    seo,
    shop: data.shop,
    primaryHero: data.hero,
    // These different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    featuredProducts: props.context.storefront.query(
      HOMEPAGE_FEATURED_PRODUCTS_QUERY,
      {
        variables: {
          /**
           * Country and language properties are automatically injected
           * into all queries. Passing them is unnecessary unless you
           * want to override them from the following default:
           */
          country,
          language,
        },
      },
    ),
    featuredCollections: props.context.storefront.query(
      FEATURED_COLLECTIONS_QUERY,
      {
        variables: {
          country,
          language,
        },
      },
    ),
    analytics: {
      pageType: AnalyticsPageType.home,
    },
  })
}

export default function HomePage() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="space-y-12 pb-16 lg:space-y-24 md:space-y-16">
      <HomeFirstView />
      <HomeItemCategory />
      <HomeRecommended>
        {data.featuredProducts && (
          <Suspense>
            <Await resolve={data.featuredProducts}>
              {(context) => {
                if (!context.products?.nodes) return null
                const products = context.products?.nodes.filter((_, i) => i < 6)
                return products.map((product) => (
                  <Link key={product.id} to={`/products/${product.handle}`}>
                    <RecommendedProductCard
                      key={product.id}
                      imageURL={product.featuredImage?.url}
                      title={product.title}
                    />
                  </Link>
                ))
              }}
            </Await>
          </Suspense>
        )}
      </HomeRecommended>
      <HomeStore />
      <HomeInstagram />
      <HomeAboutUs />
      <HomeAboutAvatar />
      <HomeAboutCustom />
    </main>
  )

  // return (
  //   <>
  //     {data.primaryHero && (
  //       <Hero {...data.primaryHero} height="full" top loading="eager" />
  //     )}
  //     {data.featuredProducts && (
  //       <Suspense>
  //         <Await resolve={data.featuredProducts}>
  //           {(context) => {
  //             if (!context.products?.nodes) return <></>
  //             return (
  //               <ProductSwimlane
  //                 products={context.products}
  //                 title="Featured Products"
  //                 count={4}
  //               />
  //             )
  //           }}
  //         </Await>
  //       </Suspense>
  //     )}
  //     {data.secondaryHero && (
  //       <Suspense fallback={<Hero {...skeletons[1]} />}>
  //         <Await resolve={data.secondaryHero}>
  //           {(context) => {
  //             if (!context.hero) return <></>
  //             return <Hero {...context.hero} />
  //           }}
  //         </Await>
  //       </Suspense>
  //     )}
  //     {data.featuredCollections && (
  //       <Suspense>
  //         <Await resolve={data.featuredCollections}>
  //           {(context) => {
  //             if (!context.collections?.nodes) return <></>
  //             return (
  //               <FeaturedCollections
  //                 collections={context.collections}
  //                 title="Collections"
  //               />
  //             )
  //           }}
  //         </Await>
  //       </Suspense>
  //     )}
  //     {data.tertiaryHero && (
  //       <Suspense fallback={<Hero {...skeletons[2]} />}>
  //         <Await resolve={data.tertiaryHero}>
  //           {(context) => {
  //             if (!context.hero) return <></>
  //             return <Hero {...context.hero} />
  //           }}
  //         </Await>
  //       </Suspense>
  //     )}
  //   </>
  // )
}
