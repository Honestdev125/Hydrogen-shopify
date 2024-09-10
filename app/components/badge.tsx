import { useMemo } from "react"
import { IconBag, Link } from "~/components/shopify"
import { useIsHydrated } from "~/hooks/use-is-hydrated"

type Props = {
  count: number
  dark: boolean
  openCart(): void
}

export function Badge({ openCart, dark, count }: Props) {
  const isHydrated = useIsHydrated()

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${
            dark
              ? "bg-contrast text-primary dark:bg-primary dark:text-contrast"
              : "bg-primary text-contrast"
          }absolute right-1 bottom-1 flex h-3 w-auto min-w-[0.75rem] items-center justify-center rounded-full px-[0.125rem] pb-px text-center font-medium text-[0.625rem] leading-none subpixel-antialiased`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  )

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex h-8 w-8 items-center justify-center focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex h-8 w-8 items-center justify-center focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  )
}
