import { useMatches } from "@remix-run/react"
import type { ShopifyPageViewPayload } from "@shopify/hydrogen"
import { useMemo } from "react"
import { DEFAULT_LOCALE } from "~/lib/utils"

type Props = {
  hasUserConsent: boolean
}

export function usePageAnalytics(props: Props) {
  const matches = useMatches()

  return useMemo(() => {
    const data: Record<string, unknown> = {}

    for (const event of matches) {
      const eventData = event?.data as Record<string, unknown>
      if (!eventData) continue
      eventData.analytics && Object.assign(data, eventData.analytics)
      const selectedLocale =
        (eventData.selectedLocale as typeof DEFAULT_LOCALE) || DEFAULT_LOCALE
      Object.assign(data, {
        currency: selectedLocale.currency,
        acceptedLanguage: selectedLocale.language,
      })
    }

    return {
      ...data,
      hasUserConsent: props.hasUserConsent,
    } as unknown as ShopifyPageViewPayload
  }, [matches, props.hasUserConsent])
}
