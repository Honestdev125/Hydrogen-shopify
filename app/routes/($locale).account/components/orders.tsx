import type { OrderCardFragment } from "customer-accountapi.generated"
import { OrderCard } from "~/components/shopify"

type Props = {
  orders: OrderCardFragment[]
}

export function Orders(props: Props) {
  return (
    <ul className="false grid grid-flow-row grid-cols-1 gap-2 gap-y-6 sm:grid-cols-3 lg:gap-6 md:gap-4">
      {props.orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  )
}
