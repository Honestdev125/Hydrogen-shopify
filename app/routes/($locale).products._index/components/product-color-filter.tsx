import { appConfig } from "~/app-config"
import { ProductColorButton } from "~/routes/($locale).products._index/components/product-color-button"

type Props = {
  values: string[]
  onCheck(method: string): void
}

export function ProductColorFilter(props: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {appConfig.product.colors.map((item) => (
        <div className="w-full" key={item.slug}>
          <ProductColorButton
            isActive={props.values.includes(item.slug)}
            slug={item.slug}
            onClick={() => {
              props.onCheck(item.slug)
            }}
          />
          <span className="text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
