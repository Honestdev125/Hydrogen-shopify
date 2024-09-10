import { useMoney } from "@shopify/hydrogen"
import type { MoneyV2 } from "@shopify/hydrogen/storefront-api-types"
import { cn } from "~/lib/cn"

type Props = {
  data: MoneyV2
  className?: string
}

export function CompareAtPrice(props: Props) {
  const context = useMoney(props.data)

  return (
    <span className={cn("strike", props.className)}>
      {context.currencyNarrowSymbol}
      {context.withoutTrailingZerosAndCurrency}
    </span>
  )
}
