import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunction,
  isRouteErrorResponse,
  useLoaderData,
  useMatches,
  useRouteError,
} from "@remix-run/react"
import { Seo, ShopifySalesChannel, useNonce } from "@shopify/hydrogen"
import {
  type LinksFunction,
  type LoaderFunctionArgs,
  type SerializeFrom,
  defer,
} from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { RootLayout } from "~/components/root-layout"
import { GenericError } from "~/components/shopify/GenericError"
import { NotFound } from "~/components/shopify/NotFound"
import { useAnalytics } from "~/hooks/use-analytics"
import { seoPayload } from "~/lib/seo.server"
import { DEFAULT_LOCALE, parseMenu } from "~/lib/utils"
import { LAYOUT_QUERY } from "~/routes/($locale)/graphql/logout-query"
import styles from "~/styles/app.css"
import favicon from "../public/favicon.svg"

/**
 * This is important to avoid re-fetching root queries on sub-navigation
 * @param props
 * @returns
 */
export const shouldRevalidate: ShouldRevalidateFunction = (props) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (props.formMethod && props.formMethod !== "GET") {
    return true
  }

  // revalidate when manually revalidating via useRevalidator
  if (props.currentUrl.toString() === props.nextUrl.toString()) {
    return true
  }

  return false
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "preconnect",
      href: "https://cdn.shopify.com",
    },
    {
      rel: "preconnect",
      href: "https://shop.app",
    },
    { rel: "icon", type: "image/svg+xml", href: favicon },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Noto+Sans+JP:wght@100..900&display=swap",
      rel: "stylesheet",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
  ]
}

export const useRootLoaderData = () => {
  const [root] = useMatches()

  return root?.data as SerializeFrom<typeof loader>
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const data = await context.storefront.query(LAYOUT_QUERY, {
    variables: {
      /**
       * https://admin.shopify.com/store/fea8a5-ec/menus/200545468599
       */
      headerMenuHandle: "main-menu",
      /**
       * https://admin.shopify.com/store/fea8a5-ec/menus/200545501367
       */
      footerMenuHandle: "footer",
      language: context.storefront.i18n.language,
    },
  })

  invariant(data, "No data returned from Shopify API")

  const customPrefixes = { BLOG: "", CATALOG: "products" }

  /**
   * ヘッダーのメニュー
   */
  const headerMenu = data?.headerMenu
    ? parseMenu(
        data.headerMenu,
        data.shop.primaryDomain.url,
        context.env,
        customPrefixes,
      )
    : undefined

  const footerMenu = data?.footerMenu
    ? parseMenu(
        data.footerMenu,
        data.shop.primaryDomain.url,
        context.env,
        customPrefixes,
      )
    : undefined

  const layout = { shop: data.shop, headerMenu, footerMenu }

  const isLoggedInPromise = context.customerAccount.isLoggedIn()

  const cartPromise = context.cart.get()

  const seo = seoPayload.root({ shop: layout.shop, url: request.url })

  return defer(
    {
      isLoggedIn: isLoggedInPromise,
      layout,
      selectedLocale: context.storefront.i18n,
      cart: cartPromise,
      analytics: {
        shopifySalesChannel: ShopifySalesChannel.hydrogen,
        shopId: layout.shop.id,
      },
      seo,
    },
    {
      headers: {
        "Set-Cookie": await context.session.commit(),
      },
    },
  )
}

export default function Root() {
  const nonce = useNonce()

  const data = useLoaderData<typeof loader>()

  const locale = data.selectedLocale ?? DEFAULT_LOCALE

  const hasUserConsent = true

  useAnalytics(hasUserConsent)

  return (
    <html lang={locale.language} className="overflow-y-auto overscroll-none">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="msvalidate.01" content="A352E6A0AF9A652267361BBB572B8468" />
        <Seo />
        <Meta />
        <Links />
      </head>
      <body className="font-sans text-neutral-800">
        <RootLayout
          key={`${locale.language}-${locale.country}`}
          layout={data.layout}
        >
          <Outlet />
        </RootLayout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  )
}

export function ErrorBoundary(props: { error: Error }) {
  const nonce = useNonce()

  const routeError = useRouteError()

  const rootData = useRootLoaderData()

  const locale = rootData?.selectedLocale ?? DEFAULT_LOCALE

  const isRouteError = isRouteErrorResponse(routeError)

  let title = "Error"

  let pageType = "page"

  if (isRouteError) {
    title = "Not found"
    if (routeError.status === 404) pageType = routeError.data || pageType
  }

  const isNotFound = isRouteError && routeError.status === 404

  return (
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <RootLayout
          layout={rootData?.layout}
          key={`${locale.language}-${locale.country}`}
        >
          {isRouteError ? (
            <>
              {routeError.status === 404 ? (
                <NotFound type={pageType} />
              ) : (
                <GenericError
                  error={{ message: `${routeError.status} ${routeError.data}` }}
                />
              )}
            </>
          ) : (
            <GenericError
              error={props.error instanceof Error ? props.error : undefined}
            />
          )}
        </RootLayout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  )
}
