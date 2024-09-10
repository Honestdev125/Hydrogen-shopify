import { Link } from "~/components/shopify"
import type { ChildEnhancedMenuItem } from "~/lib/utils"

export function FooterLink({ item }: { item: ChildEnhancedMenuItem }) {
  if (item.to.startsWith("http")) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    )
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  )
}
