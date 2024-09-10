import { Await } from "@remix-run/react"
import { ShoppingCartIcon } from "lucide-react"
import { Suspense } from "react"
import { appConfig } from "~/app-config"
import { Badge } from "~/components/badge"
import { Button } from "~/components/ui/button"
import { useRootLoaderData } from "~/root"

type Props = {
  isHome: boolean
  onOpenCart(): void
}

export function CartCount(props: Props) {
  const rootData = useRootLoaderData()

  return (
    <Suspense
      fallback={
        <Badge count={0} dark={props.isHome} openCart={props.onOpenCart} />
      }
    >
      <Button
        disabled={appConfig.features.cart === false}
        size={"icon"}
        variant={"ghost"}
        className="rounded-full"
      >
        <Await resolve={rootData?.cart}>
          {(cart) => <ShoppingCartIcon className="w-4" />}
        </Await>
      </Button>
    </Suspense>
  )
}
