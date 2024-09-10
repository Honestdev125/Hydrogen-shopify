import { Badge } from "~/components/ui/badge"

type Props = {
  type: "NEW" | "CUSTOMIZE" | "DISCOUNTED" | "SOLD_OUT"
}

export function ProductBadge(props: Props) {
  if (props.type === "NEW") {
    return (
      <Badge
        variant={"outline"}
        className="border-green-800 font-normal text-green-800"
      >
        {"NEW"}
      </Badge>
    )
  }

  if (props.type === "CUSTOMIZE") {
    return (
      <Badge variant={"outline"} className="font-normal text-neutral-500">
        {"CUSTOMIZE"}
      </Badge>
    )
  }

  return null
}
