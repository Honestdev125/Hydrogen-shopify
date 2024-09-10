import { type LoaderFunctionArgs, json } from "@shopify/remix-oxygen"
import { getFeaturedData } from "~/functions/get-featured-data"

export async function loader(props: LoaderFunctionArgs) {
  const data = await getFeaturedData(props.context.storefront)

  return json(data)
}
