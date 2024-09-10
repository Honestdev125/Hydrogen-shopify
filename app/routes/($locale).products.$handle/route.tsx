import { Await, useLoaderData } from "@remix-run/react"
import type { ShopifyAnalyticsProduct } from "@shopify/hydrogen"
import {
  AnalyticsPageType,
  Money,
  VariantSelector,
  getSelectedProductOptions,
} from "@shopify/hydrogen"
import { Image } from "@shopify/hydrogen"
import { type LoaderFunctionArgs, defer } from "@shopify/remix-oxygen"
import { Suspense, useRef, useState } from "react"
import type { ProductVariantFragmentFragment } from "storefrontapi.generated"
import invariant from "tiny-invariant"
import { AddToCartButton } from "~/components/add-to-cart-button"
import { CustomBreadcrumb } from "~/components/custom/custom-breadcrumb"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Separator } from "~/components/ui/separator"
import { Skeleton } from "~/components/ui/skeleton"
import { routeHeaders } from "~/data/cache"
import { seoPayload } from "~/lib/seo.server"
import { ProductMaterialTable } from "~/routes/($locale).products.$handle/components/product-material-table"
import { PRODUCT_QUERY } from "~/routes/($locale).products.$handle/graphql/product-query"
import { VARIANTS_QUERY } from "~/routes/($locale).products.$handle/graphql/variants-query"
import { getRecommendedProducts } from "~/routes/($locale).products.$handle/utils/get-recommended-products"
import { redirectToFirstVariant } from "~/routes/($locale).products.$handle/utils/redirect-to-first-variant"
import { ProductBadge } from "~/routes/($locale).products._index/components/product-badge"
import { ProductCard } from "~/routes/($locale).products._index/components/product-card"

export const headers = routeHeaders

export async function loader(props: LoaderFunctionArgs) {
  invariant(props.params.handle, "Missing handle param, check route filename")

  const selectedOptions = getSelectedProductOptions(props.request)

  const { shop, product } = await props.context.storefront.query(
    PRODUCT_QUERY,
    {
      variables: {
        handle: props.params.handle,
        selectedOptions,
        country: props.context.storefront.i18n.country,
        language: props.context.storefront.i18n.language,
      },
    },
  )

  if (!product?.id) {
    throw new Response("product", { status: 404 })
  }

  if (!product.selectedVariant) {
    throw redirectToFirstVariant({ product, request: props.request })
  }

  const variants = props.context.storefront.query(VARIANTS_QUERY, {
    variables: {
      handle: props.params.handle,
      country: props.context.storefront.i18n.country,
      language: props.context.storefront.i18n.language,
    },
  })

  const recommended = getRecommendedProducts(
    props.context.storefront,
    product.id,
  )

  // TODO: firstVariant is never used because we will always have a selectedVariant due to redirect
  // Investigate if we can avoid the redirect for product pages with no search params for first variant
  const [firstVariant] = product.variants.nodes

  const selectedVariant = product.selectedVariant ?? firstVariant

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  }

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: props.request.url,
  })

  return defer({
    seo,
    variants,
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: Number.parseFloat(selectedVariant.price.amount),
    },
  })
}

export default function ProductPage() {
  const data = useLoaderData<typeof loader>()

  const [api, setApi] = useState<CarouselApi | undefined>()

  const imageNodes = data.product.media.nodes.map((m) => {
    return m.__typename === "MediaImage" ? m.image ?? null : null
  })

  return (
    <main className="container pt-4">
      <CustomBreadcrumb
        items={[
          { title: "全てのアイテム", href: "/products" },
          {
            title: data.product.title,
            href: `/products/${data.product.handle}`,
          },
        ]}
      />
      <section className="flex flex-col gap-4 md:flex-row sm:gap-8">
        <div className="flex-1">
          <Carousel className="relative w-full" setApi={setApi}>
            <CarouselContent>
              {imageNodes.map((image, i) => {
                if (image === null) return null
                return (
                  <CarouselItem key={image.id}>
                    <div>
                      <Image
                        loading={i === 0 ? "eager" : "lazy"}
                        data={{
                          ...image,
                          altText: image.id || "Product image",
                        }}
                        className="aspect-square h-full w-full object-cover"
                        sizes={"auto"}
                      />
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4 border-none" />
            <CarouselNext className="right-4 border-none" />
          </Carousel>
          <div className="flex gap-x-4 overflow-x-scroll md:grid lg:grid-cols-6 sm:grid-cols-4 md:overflow-x-visible">
            {imageNodes.map((image, i) => {
              if (image === null) return null
              return (
                <button
                  type="button"
                  key={image?.id}
                  onClick={() => {
                    api?.scrollTo(i)
                  }}
                  className="flex-shrink-0"
                >
                  <Image
                    loading={i === 0 ? "eager" : "lazy"}
                    data={image}
                    className="aspect-square h-full w-full object-cover"
                    sizes="20vw"
                  />
                </button>
              )
            })}
          </div>
        </div>
        <div className="w-full flex-1 space-y-8 md:max-w-xs">
          <div className="space-y-2">
            <ProductBadge type="NEW" />
            <div>
              {data.product.vendor && (
                <p className={"opacity-60"}>{data.product.vendor}</p>
              )}
              <h1 className="text-lg">{data.product.title}</h1>
            </div>
            <Suspense fallback={<ProductForm variants={[]} />}>
              <Await
                errorElement="There was a problem loading related products"
                resolve={data.variants}
              >
                {(resp) => (
                  <ProductForm variants={resp.product?.variants.nodes || []} />
                )}
              </Await>
            </Suspense>
          </div>
          <Accordion type="multiple" defaultValue={["description", "material"]}>
            <Separator />
            {data.product.descriptionHtml && (
              <AccordionItem value="item-1">
                <AccordionTrigger>{"アイテム説明"}</AccordionTrigger>
                <AccordionContent>
                  <div
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                    dangerouslySetInnerHTML={{
                      __html: data.product.descriptionHtml,
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            )}
            <AccordionItem value="material">
              <AccordionTrigger>{"素材"}</AccordionTrigger>
              <AccordionContent>
                <ProductMaterialTable />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usage">
              <AccordionTrigger>{"お手入れ方法"}</AccordionTrigger>
              <AccordionContent>{"お手入れ方法の説明"}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <Suspense fallback={<Skeleton className="h-32" />}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={data.recommended}
        >
          {(products) => (
            <section className="pt-8">
              <h2>{"関連商品"}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:px-16">
                {products.nodes.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </section>
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export function ProductForm(props: {
  variants: ProductVariantFragmentFragment[]
}) {
  const data = useLoaderData<typeof loader>()

  const closeRef = useRef<HTMLButtonElement>(null)

  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const selectedVariant = data.product.selectedVariant

  /**
   * 在庫切れ
   */
  const isOutOfStock = !selectedVariant?.availableForSale

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount

  const [firstProduct] = data.analytics.products

  const productAnalytics: ShopifyAnalyticsProduct = {
    ...firstProduct,
    quantity: 1,
  }

  return (
    <div className="space-y-4">
      {selectedVariant && (
        <div>
          <span className="font-semibold text-lg">
            <Money
              withoutTrailingZeros
              data={selectedVariant.price}
              as="span"
              data-test="price"
            />
            {isOnSale && selectedVariant.compareAtPrice && (
              <Money
                withoutTrailingZeros
                data={selectedVariant.compareAtPrice}
                as="span"
                className="strike opacity-50"
              />
            )}
          </span>
          <span className="text-xs">{"（税込）"}</span>
        </div>
      )}
      <VariantSelector
        handle={data.product.handle}
        options={data.product.options}
        variants={props.variants}
      >
        {(context) => {
          const availableOptions = context.option.values.filter((value) => {
            return value.isAvailable
          })
          const isAvailable = 0 < availableOptions.length
          if (!isAvailable) return null
          if (context.option.name === "Color") {
            return (
              <div className="space-y-1">
                <legend>{"カラー"}</legend>
                <Select>
                  <SelectTrigger className="w-full rounded">
                    <SelectValue placeholder={context.option.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {availableOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )
          }
          if (context.option.name === "Size") {
            return (
              <div className="space-y-1">
                <legend>{"サイズ"}</legend>
                <Select>
                  <SelectTrigger className="w-24 rounded">
                    <SelectValue placeholder={context.option.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {availableOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )
          }
        }}
      </VariantSelector>
      {selectedVariant && (
        <div className="grid items-stretch gap-4">
          {isOutOfStock ? (
            <Button variant="secondary" disabled>
              {"売り切れ"}
            </Button>
          ) : (
            <div className="space-y-1">
              <p className="text-center text-sm">{"本日から8日以内に発送"}</p>
              <AddToCartButton
                lines={[
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                  },
                ]}
                analytics={{
                  products: [productAnalytics],
                  totalValue: Number.parseFloat(productAnalytics.price),
                }}
              >
                {"カートに入れる"}
              </AddToCartButton>
            </div>
          )}
          {/* {!isOutOfStock && (
            <ShopPayButton
              width="100%"
              variantIds={[selectedVariant.id]}
              storeDomain={data.storeDomain}
            />
          )} */}
        </div>
      )}
    </div>
  )
}
