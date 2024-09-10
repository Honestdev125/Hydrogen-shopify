import { Link } from "@remix-run/react"
import { HomeSectionHeader } from "~/routes/($locale)._index/components/home-section-header"
import { ProductCategoryCard } from "~/routes/($locale)._index/components/product-category-card"

/**
 * アイテムカテゴリー
 * @returns
 */
export function HomeItemCategory() {
  return (
    <section className="container w-full space-y-8">
      <HomeSectionHeader
        title={"ITEM CATEGORY"}
        subTitle={"アイテムカテゴリー"}
      />
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:px-16">
        <Link to="/products?category=leather-shoes">
          <ProductCategoryCard
            imageUrl={
              "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/home-category-a.webp?v=1711890147"
            }
            categoryName="革靴"
          />
        </Link>
        <Link to="/products?category=sneakers">
          <ProductCategoryCard
            imageUrl={
              "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/home-category-b.webp?v=1711890148"
            }
            categoryName="スニーカー"
          />
        </Link>
        <Link to="/products?category=golf-shoes">
          <ProductCategoryCard
            imageUrl={
              "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/home-category-c.webp?v=1711890148"
            }
            categoryName="ゴルフシューズ"
          />
        </Link>
        <Link to="/products?category=golf-wear">
          <ProductCategoryCard
            imageUrl={
              "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/home-category-d.webp?v=1711890148"
            }
            categoryName="ゴルフウェア"
          />
        </Link>
      </div>
    </section>
  )
}
