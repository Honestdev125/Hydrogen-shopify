import { redirect } from "@shopify/remix-oxygen"
import type { ProductQuery } from "storefrontapi.generated"

type Props = {
  product: ProductQuery["product"]
  request: Request
}

export function redirectToFirstVariant(props: Props) {
  const url = new URL(props.request.url)

  const searchParams = new URLSearchParams(url.search)

  const firstVariant = props.product?.variants.nodes[0]

  for (const option of firstVariant.selectedOptions) {
    searchParams.set(option.name, option.value)
  }

  url.search = searchParams.toString()

  return redirect(url.href.replace(url.origin, ""), 302)
}
