import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { Image, Money, flattenConnection } from "@shopify/hydrogen"
import { type LoaderFunctionArgs, json, redirect } from "@shopify/remix-oxygen"
import clsx from "clsx"
import type { OrderFragment } from "customer-accountapi.generated"
import invariant from "tiny-invariant"
import { Heading, Link, PageHeader, Text } from "~/components/shopify"
import { CUSTOMER_ORDER_QUERY } from "~/graphql/customer-account/CustomerOrderQuery"
import { statusMessage } from "~/lib/utils"

export const meta: MetaFunction<typeof loader> = (props) => {
  return [{ title: `Order ${props.data?.order?.name}` }]
}

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect(params?.locale ? `${params.locale}/account` : "/account")
  }

  const queryParams = new URL(request.url).searchParams

  const orderToken = queryParams.get("key")

  invariant(orderToken, "Order token is required")

  try {
    const orderId = `gid://shopify/Order/${params.id}?key=${orderToken}`

    const { data, errors } = await context.customerAccount.query(
      CUSTOMER_ORDER_QUERY,
      { variables: { orderId } },
    )

    if (errors?.length || !data?.order || !data?.lineItems) {
      throw new Error("Order not found")
    }

    const order: OrderFragment = data.order

    const lineItems = flattenConnection(order.lineItems)

    const discountApplications = flattenConnection(order.discountApplications)

    const firstDiscount = discountApplications[0]?.value

    const discountValue =
      firstDiscount?.__typename === "MoneyV2" && firstDiscount

    const discountPercentage =
      firstDiscount?.__typename === "PricingPercentageValue" &&
      firstDiscount?.percentage

    const fulfillmentStatus = flattenConnection(order.fulfillments)[0].status

    return json(
      {
        order,
        lineItems,
        discountValue,
        discountPercentage,
        fulfillmentStatus,
      },
      {
        headers: {
          "Set-Cookie": await context.session.commit(),
        },
      },
    )
  } catch (error) {
    throw new Response(error instanceof Error ? error.message : undefined, {
      status: 404,
      headers: {
        "Set-Cookie": await context.session.commit(),
      },
    })
  }
}

export default function OrderRoute() {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData<typeof loader>()
  return (
    <div>
      <PageHeader heading="Order detail">
        <Link to="/account">
          <Text color="subtle">Return to Account Overview</Text>
        </Link>
      </PageHeader>
      <div className="w-full p-6 sm:grid-cols-1 lg:p-12 md:p-8 lg:py-6">
        <div>
          <Text as="h3" size="lead">
            Order No. {order.name}
          </Text>
          <Text className="mt-2" as="p">
            Placed on {new Date(order.processedAt!).toDateString()}
          </Text>
          <div className="grid items-start gap-12 md:grid-cols-4 sm:grid-cols-1 md:gap-16 sm:divide-y sm:divide-gray-200">
            <table className="my-8 min-w-full divide-y divide-gray-300 md:col-span-3">
              <thead>
                <tr className="align-baseline">
                  <th
                    scope="col"
                    className="pr-3 pb-4 pl-0 text-left font-semibold"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 pb-4 text-right font-semibold md:table-cell sm:table-cell"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 pb-4 text-right font-semibold md:table-cell sm:table-cell"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-4 pb-4 text-right font-semibold"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lineItems.map((lineItem) => (
                  <tr key={lineItem.id}>
                    <td className="w-full max-w-0 py-4 pr-3 pl-0 align-top sm:w-auto sm:max-w-none sm:align-middle">
                      <div className="flex gap-6">
                        {lineItem?.image && (
                          <div className="card-image aspect-square w-24">
                            <Image
                              data={lineItem.image}
                              width={96}
                              height={96}
                            />
                          </div>
                        )}
                        <div className="hidden flex-col justify-center lg:flex">
                          <Text as="p">{lineItem.title}</Text>
                          <Text size="fine" className="mt-1" as="p">
                            {lineItem.variantTitle}
                          </Text>
                        </div>
                        <dl className="grid">
                          <dt className="sr-only">Product</dt>
                          <dd className="truncate lg:hidden">
                            <Heading size="copy" format as="h3">
                              {lineItem.title}
                            </Heading>
                            <Text size="fine" className="mt-1">
                              {lineItem.variantTitle}
                            </Text>
                          </dd>
                          <dt className="sr-only">Price</dt>
                          <dd className="truncate sm:hidden">
                            <Text size="fine" className="mt-4">
                              <Money data={lineItem.price!} />
                            </Text>
                          </dd>
                          <dt className="sr-only">Quantity</dt>
                          <dd className="truncate sm:hidden">
                            <Text className="mt-1" size="fine">
                              Qty: {lineItem.quantity}
                            </Text>
                          </dd>
                        </dl>
                      </div>
                    </td>
                    <td className="hidden px-3 py-4 text-right align-top sm:table-cell sm:align-middle">
                      <Money data={lineItem.price!} />
                    </td>
                    <td className="hidden px-3 py-4 text-right align-top sm:table-cell sm:align-middle">
                      {lineItem.quantity}
                    </td>
                    <td className="px-3 py-4 text-right align-top sm:table-cell sm:align-middle">
                      <Text>
                        <Money data={lineItem.totalDiscount!} />
                      </Text>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {(discountValue?.amount || discountPercentage) && (
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-6 pr-3 pl-6 text-right font-normal sm:table-cell md:pl-0"
                    >
                      <Text>Discounts</Text>
                    </th>
                    <th
                      scope="row"
                      className="pt-6 pr-3 text-left font-normal sm:hidden"
                    >
                      <Text>Discounts</Text>
                    </th>
                    <td className="pt-6 pr-4 pl-3 text-right font-medium text-green-700 md:pr-3">
                      {discountPercentage ? (
                        <span className="text-sm">
                          -{discountPercentage}% OFF
                        </span>
                      ) : (
                        discountValue && <Money data={discountValue!} />
                      )}
                    </td>
                  </tr>
                )}
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-6 pr-3 pl-6 text-right font-normal sm:table-cell md:pl-0"
                  >
                    <Text>Subtotal</Text>
                  </th>
                  <th
                    scope="row"
                    className="pt-6 pr-3 text-left font-normal sm:hidden"
                  >
                    <Text>Subtotal</Text>
                  </th>
                  <td className="pt-6 pr-4 pl-3 text-right md:pr-3">
                    <Money data={order.subtotal!} />
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 pr-3 pl-6 text-right font-normal sm:table-cell md:pl-0"
                  >
                    Tax
                  </th>
                  <th
                    scope="row"
                    className="pt-4 pr-3 text-left font-normal sm:hidden"
                  >
                    <Text>Tax</Text>
                  </th>
                  <td className="pt-4 pr-4 pl-3 text-right md:pr-3">
                    <Money data={order.totalTax!} />
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 pr-3 pl-6 text-right font-semibold sm:table-cell md:pl-0"
                  >
                    Total
                  </th>
                  <th
                    scope="row"
                    className="pt-4 pr-3 text-left font-semibold sm:hidden"
                  >
                    <Text>Total</Text>
                  </th>
                  <td className="pt-4 pr-4 pl-3 text-right font-semibold md:pr-3">
                    <Money data={order.totalPrice!} />
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="sticky top-nav border-none md:my-8">
              <Heading size="copy" className="font-semibold" as="h3">
                Shipping Address
              </Heading>
              {order?.shippingAddress ? (
                <ul className="mt-6">
                  <li>
                    <Text>{order.shippingAddress.name}</Text>
                  </li>
                  {order?.shippingAddress?.formatted ? (
                    order.shippingAddress.formatted.map((line: string) => (
                      <li key={line}>
                        <Text>{line}</Text>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              ) : (
                <p className="mt-3">No shipping address defined</p>
              )}
              <Heading size="copy" className="mt-8 font-semibold" as="h3">
                Status
              </Heading>
              {fulfillmentStatus && (
                <div
                  className={clsx(
                    "mt-3 inline-block w-auto rounded-full px-3 py-1 font-medium text-xs",
                    fulfillmentStatus === "SUCCESS"
                      ? "bg-green-100 text-green-800"
                      : "bg-primary/20 text-primary/50",
                  )}
                >
                  <Text size="fine">{statusMessage(fulfillmentStatus!)}</Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
