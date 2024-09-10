import { Outlet, useLoaderData, useMatches, useOutlet } from "@remix-run/react"
import { type LoaderFunctionArgs, defer } from "@shopify/remix-oxygen"
import { Modal } from "~/components/shopify"
import { CACHE_NONE, routeHeaders } from "~/data/cache"
import { getFeaturedData } from "~/functions/get-featured-data"
import { CUSTOMER_DETAILS_QUERY } from "~/graphql/customer-account/CustomerDetailsQuery"
import { Account } from "~/routes/($locale).account/components/account"
import { doLogout } from "../($locale).account_.logout/route"

export const headers = routeHeaders

export async function loader({ context }: LoaderFunctionArgs) {
  const { data, errors } = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  )

  /**
   * If the customer failed to load, we assume their access token is invalid.
   */
  if (errors?.length || !data?.customer) {
    throw await doLogout(context)
  }

  const customer = data?.customer

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}.`
      : "Welcome to your account."
    : "Account Details"

  return defer(
    {
      customer,
      heading,
      featuredDataPromise: getFeaturedData(context.storefront),
    },
    {
      headers: {
        "Cache-Control": CACHE_NONE,
        "Set-Cookie": await context.session.commit(),
      },
    },
  )
}

export default function Authenticated() {
  const data = useLoaderData<typeof loader>()

  const outlet = useOutlet()

  const matches = useMatches()

  // routes that export handle { renderInModal: true }
  const renderOutletInModal = matches.some((match) => {
    const handle = match?.handle as { renderInModal?: boolean }
    return handle?.renderInModal
  })

  if (outlet) {
    if (renderOutletInModal) {
      return (
        <>
          <Modal cancelLink="/account">
            <Outlet context={{ customer: data.customer }} />
          </Modal>
          <Account {...data} />
        </>
      )
    }
    return <Outlet context={{ customer: data.customer }} />
  }

  return <Account {...data} />
}
