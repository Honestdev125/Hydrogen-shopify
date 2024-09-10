import { Await } from "@remix-run/react"
import { Suspense } from "react"
import { Cart, CartLoading, Drawer } from "~/components/shopify"
import { useRootLoaderData } from "~/root"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer(props: Props) {
  const rootData = useRootLoaderData()

  return (
    <Drawer
      open={props.isOpen}
      onClose={props.onClose}
      heading="Cart"
      openFrom="right"
    >
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => (
              <Cart layout="drawer" onClose={props.onClose} cart={cart} />
            )}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  )
}
