import type { OrderCardFragment } from "customer-accountapi.generated"
import { EmptyOrders } from "~/routes/($locale).account/components/empty-orders"
import { Orders } from "~/routes/($locale).account/components/orders"

type Props = {
  orders: OrderCardFragment[]
}

export function AccountOrderHistory(props: Props) {
  return (
    <div className="mt-6">
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 lg:p-12 md:p-8">
        <h2 className="font-bold text-lead">Order History</h2>
        {props.orders?.length ? (
          <Orders orders={props.orders} />
        ) : (
          <EmptyOrders />
        )}
      </div>
    </div>
  )
}
