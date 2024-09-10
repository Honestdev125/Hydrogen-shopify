import { useId } from "react"
import { appConfig } from "~/app-config"
import { Checkbox } from "~/components/ui/checkbox"

type Props = {
  values: string[]
  onCheck(method: string): void
  onCheckAll(): void
}

/**
 * 素材
 */
export function ProductMaterialFilter(props: Props) {
  const id = useId()

  const items = appConfig.product.materiels

  const isCheckedAll = props.values.length === 0

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2">
        <Checkbox
          id={id}
          checked={isCheckedAll}
          onCheckedChange={props.onCheckAll}
        />
        <label htmlFor={id} className="text-sm">
          {"全ての素材"}
        </label>
      </div>
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-x-2">
          <Checkbox
            id={item.slug}
            checked={props.values.includes(item.slug)}
            onCheckedChange={() => {
              props.onCheck(item.slug)
            }}
          />
          <label htmlFor={item.slug} className="text-sm">
            {item.name}
          </label>
        </div>
      ))}
    </div>
  )
}
