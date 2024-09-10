import { useId } from "react"
import { appConfig } from "~/app-config"
import { Checkbox } from "~/components/ui/checkbox"

type Props = {
  values: string[]
  onCheck(method: string): void
  onCheckAll(): void
}

/**
 * 製法
 */
export function ProductMethodFilter(props: Props) {
  const id = useId()

  const items = appConfig.product.methods

  const isCheckedAll = props.values.length === 0

  const isChecked = (slug: string) => props.values.includes(slug)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2">
        <Checkbox
          id={id}
          checked={isCheckedAll}
          onCheckedChange={props.onCheckAll}
        />
        <label htmlFor={id} className="text-sm">
          {"全ての製法"}
        </label>
      </div>
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-x-2">
          <Checkbox
            id={item.slug}
            checked={isChecked(item.slug)}
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
