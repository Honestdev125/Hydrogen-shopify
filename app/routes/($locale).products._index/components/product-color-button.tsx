import { CheckIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/cn"

type Props = {
  slug: string
  isActive: boolean
  onClick(): void
}

export function ProductColorButton(props: Props) {
  const isLightColor = ["off-white", "antique-gray"].includes(props.slug)

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      style={{ borderRadius: "0.4rem" }}
      className={cn("block w-full", {
        "bg-neutral-800 hover:bg-neutral-800/90": props.slug === "black",
        "bg-neutral-50 hover:bg-neutral-50/90": props.slug === "off-white",
        "bg-neutral-500 hover:bg-neutral-500/90": props.slug === "gray",
        "bg-neutral-400 hover:bg-neutral-400/90": props.slug === "antique-gray",
        "bg-green-700 hover:bg-green-700/90": props.slug === "green",
        "bg-red-800 hover:bg-red-600/90": props.slug === "wine-red",
        "bg-pink-600 hover:bg-pink-600/90": props.slug === "pink",
        "bg-yellow-800 hover:bg-yellow-800/90": props.slug === "brown",
        "bg-yellow-900 hover:bg-yellow-900/90": props.slug === "dark-brown",
      })}
      onClick={props.onClick}
    >
      {props.isActive && (
        <div className="flex justify-center">
          <CheckIcon
            className={cn("icon h-6 w-6", {
              "text-white": !isLightColor,
              "text-black": isLightColor,
            })}
          />
        </div>
      )}
    </Button>
  )
}
