import { appConfig } from "~/app-config"
import { Button } from "~/components/ui/button"

type Props = {
  values: string[]
  onCheck(method: string): void
}

export function ProductSceneFilter(props: Props) {
  const items = appConfig.product.cases

  const isChecked = props.values.includes.bind(props.values)

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Button
          key={item.slug}
          size={"sm"}
          variant={isChecked(item.slug) ? "default" : "secondary"}
          className="rounded-full text-xs"
          onClick={() => {
            props.onCheck(item.slug)
          }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}
