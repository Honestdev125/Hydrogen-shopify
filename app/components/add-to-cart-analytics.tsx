import type { FetcherWithComponents } from "@remix-run/react"
import {
  AnalyticsEventName,
  CartForm,
  type ShopifyAddToCartPayload,
  getClientBrowserParameters,
  sendShopifyAnalytics,
} from "@shopify/hydrogen"
import { useEffect } from "react"
import { usePageAnalytics } from "~/hooks/use-page-analytics"

type Props = {
  fetcher: FetcherWithComponents<any>
  children: React.ReactNode
}

export function AddToCartAnalytics(props: Props): JSX.Element {
  const fetcherData = props.fetcher.data

  const formData = props.fetcher.formData

  const pageAnalytics = usePageAnalytics({ hasUserConsent: true })

  useEffect(() => {
    if (formData) {
      const cartData: Record<string, unknown> = {}
      const cartInputs = CartForm.getFormInput(formData)
      try {
        if (cartInputs.inputs.analytics) {
          const dataInForm: unknown = JSON.parse(
            String(cartInputs.inputs.analytics),
          )
          Object.assign(cartData, dataInForm)
        }
      } catch {
        // do nothing
      }

      if (Object.keys(cartData).length && fetcherData) {
        const addToCartPayload: ShopifyAddToCartPayload = {
          ...getClientBrowserParameters(),
          ...pageAnalytics,
          ...cartData,
          cartId: fetcherData.cart.id,
        }

        sendShopifyAnalytics({
          eventName: AnalyticsEventName.ADD_TO_CART,
          payload: addToCartPayload,
        })
      }
    }
  }, [fetcherData, formData, pageAnalytics])

  return <>{props.children}</>
}
