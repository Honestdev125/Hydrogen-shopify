import { Await, Link } from "@remix-run/react"
import { Suspense } from "react"
import { Separator } from "~/components/ui/separator"
import { getFeaturedData } from "~/functions/get-featured-data"
import { getImageLoadingPriority } from "~/lib/const"
import { ProductCard } from "~/routes/($locale).products._index/components/product-card"

type FeaturedData = Awaited<ReturnType<typeof getFeaturedData>>

type Props = {
  recommendations: Promise<null | FeaturedData>
}

export function NoResults(props: Props) {
  return (
    <section className="space-y-4">
      <p>{"何も見つかりませんでした。"}</p>
      <Separator />
      <div className="space-y-2">
        <h3>{"その他の商品"}</h3>
        <Suspense>
          <Await
            errorElement="There was a problem loading related products"
            resolve={props.recommendations}
          >
            {(result) => {
              if (!result) return null
              return (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:px-16">
                  {result.featuredProducts.nodes.map((product, i) => (
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
              )
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  )
}
