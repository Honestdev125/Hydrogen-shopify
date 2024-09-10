import { XIcon } from "lucide-react"
import { Button } from "~/components/ui/button"

type Props = {
  children: React.ReactNode
  onClick(): void
}

export function FilterButton(props: Props) {
  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      className="rounded-full pr-2 pl-4 font-normal text-sm"
      onClick={props.onClick}
    >
      {props.children}
      <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-500 text-white">
        <XIcon className="w-3" />
      </div>
    </Button>
  )
}
