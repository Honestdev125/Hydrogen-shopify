import { NavLink as RemixNavLink } from "@remix-run/react"
import { cn } from "~/lib/cn"

type Props = {
  to: string
  children: React.ReactNode
}

export function HeaderNavLink(props: Props) {
  return (
    <RemixNavLink
      prefetch="intent"
      to={props.to}
      caseSensitive
      className={(context) => {
        return cn("text-xs", context.isActive ? "font-bold" : "")
      }}
    >
      {props.children}
    </RemixNavLink>
  )
}
