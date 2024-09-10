import { Await } from "@remix-run/react"
import { flattenConnection } from "@shopify/hydrogen"
import type { CustomerDetailsFragment } from "customer-accountapi.generated"
import { Suspense } from "react"
import { Form } from "react-hook-form"
import {
  AccountAddressBook,
  AccountDetails,
  FeaturedCollections,
  PageHeader,
  ProductSwimlane,
} from "~/components/shopify"
import type { getFeaturedData } from "~/functions/get-featured-data"
import { usePrefixPathWithLocale } from "~/lib/utils"
import { AccountOrderHistory } from "~/routes/($locale).account/components/account-order-history"

export type FeaturedData = Awaited<ReturnType<typeof getFeaturedData>>

type Props = {
  customer: CustomerDetailsFragment
  featuredDataPromise: Promise<FeaturedData>
  heading: string
}

export function Account(props: Props) {
  const orders = flattenConnection(props.customer.orders)

  const addresses = flattenConnection(props.customer.addresses)

  return (
    <>
      <PageHeader heading={props.heading}>
        <Form method="post" action={usePrefixPathWithLocale("/account/logout")}>
          <button type="submit" className="text-primary/50">
            Sign out
          </button>
        </Form>
      </PageHeader>
      {orders && <AccountOrderHistory orders={orders} />}
      <AccountDetails customer={props.customer} />
      <AccountAddressBook addresses={addresses} customer={props.customer} />
      {!orders.length && (
        <Suspense>
          <Await
            resolve={props.featuredDataPromise}
            errorElement="There was a problem loading featured products."
          >
            {(data) => (
              <>
                <FeaturedCollections
                  title="Popular Collections"
                  collections={data.featuredCollections}
                />
                <ProductSwimlane products={data.featuredProducts} />
              </>
            )}
          </Await>
        </Suspense>
      )}
    </>
  )
}
