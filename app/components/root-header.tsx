import { CartForm } from "@shopify/hydrogen"
import { SearchIcon } from "lucide-react"
import { useEffect } from "react"
import { appConfig } from "~/app-config"
import { AccountLink } from "~/components/account-link"
import { CartCount } from "~/components/cart-count"
import { CartDrawer } from "~/components/cart-drawer"
import { HeaderNavLink } from "~/components/header-nav-link"
import { LanguageButton } from "~/components/language-button"
import { NavigationDialogButton } from "~/components/navigation-dialog-button"
import { useDrawer } from "~/components/shopify"
import { Link } from "~/components/shopify"
import { Button } from "~/components/ui/button"
import { useCartFetchers } from "~/hooks/use-cart-fetchers"
import { cn } from "~/lib/cn"
import { useIsHomePath } from "~/lib/utils"

type Props = {
  title: string
}

export function RootHeader(props: Props) {
  const isHome = useIsHomePath()

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer()

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd)

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return
    openCart()
  }, [addToCartFetchers, isCartOpen, openCart])

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <header
        className={cn("fixed top-0 w-full space-x-8 py-2")}
        style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link className={"text-xl"} to="/" prefetch="intent">
              {appConfig.site.name}
            </Link>
            <div className="flex items-center gap-x-8">
              <nav className="flex gap-x-6">
                <HeaderNavLink to={"/products"}>{"商品一覧"}</HeaderNavLink>
                <div className="hidden items-center gap-x-6 lg:flex">
                  <HeaderNavLink to={"/products?category=leather-shoes"}>
                    {"革靴"}
                  </HeaderNavLink>
                  <HeaderNavLink to={"/products?category=boots"}>
                    {"ブーツ"}
                  </HeaderNavLink>
                  <HeaderNavLink to={"/products?category=sneakers"}>
                    {"スニーカー"}
                  </HeaderNavLink>
                  <HeaderNavLink to={"/products?category=golf-shoes"}>
                    {"ゴルフシューズ"}
                  </HeaderNavLink>
                  <HeaderNavLink to={"/products?category=golf-wear"}>
                    {"ゴルフウェア"}
                  </HeaderNavLink>
                  {/* <HeaderNavLink to={"/products"}>
                    {"アクセサリー・小物"}
                  </HeaderNavLink> */}
                </div>
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageButton />
            </div>
            <div className="space-x-1">
              <Button
                disabled={!appConfig.features.search}
                size={"icon"}
                variant={"ghost"}
                className="rounded-full"
              >
                <SearchIcon className="w-4" />
              </Button>
              <AccountLink />
              <CartCount isHome={isHome} onOpenCart={openCart} />
              <NavigationDialogButton />
            </div>
          </div>
        </div>
      </header>
      <div className="h-14 py-2" />
    </>
  )
}
