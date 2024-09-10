import type { ShopifyAnalyticsProduct } from "@shopify/hydrogen"
import { Image, Money, flattenConnection } from "@shopify/hydrogen"
import type { MoneyV2 } from "@shopify/hydrogen/storefront-api-types"
import type { ProductCardFragment } from "storefrontapi.generated"
import { AddToCartButton, Link, Text } from "~/components/shopify"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/cn"
import { isDiscounted, isNewArrival } from "~/lib/utils"
import { CompareAtPrice } from "~/routes/($locale).products._index/components/compare-at-price-text"
import { ProductBadge } from "~/routes/($locale).products._index/components/product-badge"

type Props = {
  product: ProductCardFragment
  label?: string
  className?: string
  loading?: HTMLImageElement["loading"]
  onClick?(): void
  quickAdd?: boolean
}

export function ProductCard(props: Props) {
  if (!props.product.variants?.nodes?.length) {
    return null
  }

  const [firstVariant] = flattenConnection(props.product.variants)

  if (!firstVariant) {
    return null
  }

  if (firstVariant.image == null) {
    return null
  }

  const _isDiscounted = isDiscounted(
    firstVariant.price as MoneyV2,
    firstVariant.compareAtPrice as MoneyV2,
  )

  const _isNewArrival = isNewArrival(props.product.publishedAt)

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: props.product.id,
    variantGid: firstVariant.id,
    name: props.product.title,
    variantName: firstVariant.title,
    brand: props.product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  }

  if (props.product.featuredImage == null) return null

  return (
    <div className="flex flex-col gap-2">
      <div className={cn("grid gap-4", props.className)}>
        <div className="card-image bg-primary/5">
          <Link
            className={"block"}
            onClick={props.onClick}
            to={`/products/${props.product.handle}`}
            prefetch="intent"
          >
            <Image
              className="fadeIn w-full object-cover"
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
              data={props.product.featuredImage}
              alt={props.product.title}
              loading={props.loading}
            />
          </Link>
        </div>
        <div className="space-y-2">
          <Button
            size={"sm"}
            className="block h-6 w-full border-none bg-neutral-400 font-normal text-white text-xs"
            style={{ borderRadius: "0.2rem" }}
          >
            {"試着リスト ＋"}
          </Button>
          <Link
            className={"block"}
            onClick={props.onClick}
            to={`/products/${props.product.handle}`}
            prefetch="intent"
          >
            <div className="space-y-1">
              <div>
                <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                  {props.product.title}
                </h3>
                <div className="flex gap-4">
                  <Text className="flex gap-4 text-sm">
                    <Money withoutTrailingZeros data={firstVariant.price} />
                    {isDiscounted(
                      firstVariant.price as MoneyV2,
                      firstVariant.compareAtPrice as MoneyV2,
                    ) && (
                      <CompareAtPrice
                        className={"opacity-50"}
                        data={firstVariant.compareAtPrice as MoneyV2}
                      />
                    )}
                  </Text>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {_isNewArrival && <ProductBadge type={"NEW"} />}
                {_isDiscounted && <ProductBadge type={"DISCOUNTED"} />}
                <ProductBadge type="CUSTOMIZE" />
              </div>
            </div>
          </Link>
        </div>
      </div>
      {props.quickAdd && firstVariant.availableForSale && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          variant="secondary"
          className="mt-2"
          analytics={{
            products: [productAnalytics],
            totalValue: Number.parseFloat(productAnalytics.price),
          }}
        >
          <Text
            as="span"
            className="flex items-center justify-center gap-2 text-sm"
          >
            {"Add to Cart"}
          </Text>
        </AddToCartButton>
      )}
      {props.quickAdd && !firstVariant.availableForSale && (
        <Button variant="secondary" className="mt-2" disabled>
          <Text
            as="span"
            className="flex items-center justify-center gap-2 text-sm"
          >
            {"Sold out"}
          </Text>
        </Button>
      )}
    </div>
  )
}
