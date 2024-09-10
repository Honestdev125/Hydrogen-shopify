import type { HomepageFeaturedProductsQuery } from "storefrontapi.generated"
import { ProductCard } from "~/routes/($locale).products._index/components/product-card"

const mockProducts = {
  nodes: new Array(12).fill(""),
}

type ProductSwimlaneProps = HomepageFeaturedProductsQuery & {
  title?: string
  count?: number
}

export function ProductSwimlane({
  title = "Featured Products",
  products = mockProducts,
  count = 12,
  ...props
}: ProductSwimlaneProps) {
  return (
    <section>
      <div className="swimlane hiddenScroll lg:scroll-px-12 md:scroll-px-8 lg:px-12 md:px-8 md:pb-8">
        <h2 className="max-w-prose whitespace-normal font-bold text-heading">
          {title}
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {products.nodes.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              className="w-80 snap-start"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
