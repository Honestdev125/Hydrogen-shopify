import type { LoaderFunctionArgs } from "@shopify/remix-oxygen"

export async function loader(props: LoaderFunctionArgs) {
  const { language, country } = props.context.storefront.i18n

  if (
    props.params.locale &&
    props.params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are still at the default locale
    // then the the locale param must be invalid, send to the 404 page
    throw new Response(null, { status: 404 })
  }

  return null
}
