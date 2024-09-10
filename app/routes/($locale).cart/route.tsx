import { Await } from "@remix-run/react"
import { CartForm, type CartQueryDataReturn } from "@shopify/hydrogen"
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { Cart } from "~/components/shopify"
import { isLocalPath } from "~/lib/utils"
import { useRootLoaderData } from "~/root"

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData()

  const { action, inputs } = CartForm.getFormInput(formData)

  invariant(action, "No cartAction defined")

  let status = 200
  let result: CartQueryDataReturn

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await context.cart.addLines(inputs.lines)
      break
    case CartForm.ACTIONS.LinesUpdate:
      result = await context.cart.updateLines(inputs.lines)
      break
    case CartForm.ACTIONS.LinesRemove:
      result = await context.cart.removeLines(inputs.lineIds)
      break
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[]

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes)

      result = await context.cart.updateDiscountCodes(discountCodes)
      break
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await context.cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      })
      break
    default:
      invariant(false, `${action} cart action is not defined`)
  }

  /**
   * The Cart ID may change after each mutation. We need to update it each time in the session.
   */
  const cartId = result.cart.id

  const headers = context.cart.setCartId(result.cart.id)

  const redirectTo = formData.get("redirectTo") ?? null

  if (typeof redirectTo === "string" && isLocalPath(redirectTo)) {
    status = 303
    headers.set("Location", redirectTo)
  }

  const { cart: cartResult, errors, userErrors } = result

  headers.append("Set-Cookie", await context.session.commit())

  return json(
    {
      cart: cartResult,
      userErrors,
      errors,
      analytics: {
        cartId,
      },
    },
    { status, headers },
  )
}

export async function loader({ context }: LoaderFunctionArgs) {
  const { cart } = context

  return json(await cart.get())
}

export default function CartRoute() {
  const rootData = useRootLoaderData()

  // @todo: finish on a separate PR
  return (
    <div className="grid w-full justify-items-start gap-8 p-6 py-8 lg:p-12 md:p-8">
      <Await resolve={rootData?.cart}>
        {(cart) => <Cart layout="page" cart={cart} />}
      </Await>
    </div>
  )
}
