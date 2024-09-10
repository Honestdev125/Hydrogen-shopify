import { Disclosure } from "@headlessui/react"
import { Await, Form, useParams } from "@remix-run/react"
import { CartForm } from "@shopify/hydrogen"
import { Suspense, useEffect, useMemo } from "react"
import { useWindowScroll } from "react-use"

import type { LayoutQuery } from "storefrontapi.generated"
import {
  Cart,
  CartLoading,
  CountrySelector,
  Drawer,
  Heading,
  IconAccount,
  IconBag,
  IconCaret,
  IconLogin,
  IconMenu,
  IconSearch,
  Input,
  Link,
  Section,
  Text,
  useDrawer,
} from "~/components/shopify"
import { useCartFetchers } from "~/hooks/use-cart-fetchers"
import { useIsHydrated } from "~/hooks/use-is-hydrated"
import {
  type ChildEnhancedMenuItem,
  type EnhancedMenu,
  useIsHomePath,
} from "~/lib/utils"
import { useRootLoaderData } from "~/root"

type LayoutProps = {
  children: React.ReactNode
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null
    footerMenu?: EnhancedMenu | null
  }
}

export function Layout({ children, layout }: LayoutProps) {
  const { headerMenu, footerMenu } = layout || {}

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && layout?.shop.name && (
          <Header title={layout.shop.name} menu={headerMenu} />
        )}
        <main id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  )
}

function Header({ title, menu }: { title: string; menu?: EnhancedMenu }) {
  const isHome = useIsHomePath()

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer()

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
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
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  )
}

function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const rootData = useRootLoaderData()

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  )
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean
  onClose: () => void
  menu: EnhancedMenu
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  )
}

function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu
  onClose: () => void
}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <span key={item.id} className="block">
          <Link
            to={item.to}
            target={item.target}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "-mb-px border-b pb-1" : "pb-1"
            }
          >
            <Text as="span" size="copy">
              {item.title}
            </Text>
          </Link>
        </span>
      ))}
    </nav>
  )
}

function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu,
}: {
  title: string
  isHome: boolean
  openCart: () => void
  openMenu: () => void
}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams()

  return (
    <header
      className={`${
        isHome
          ? "bg-primary/80 text-contrast shadow-darkHeader dark:bg-contrast/60 dark:text-primary"
          : "bg-contrast/80 text-primary"
      }sticky top-0 z-40 flex h-nav w-full items-center justify-between gap-4 px-4 leading-none backdrop-blur-lg lg:hidden md:px-8`}
    >
      <div className="flex w-full items-center justify-start gap-4">
        <button
          onClick={openMenu}
          className="relative flex h-8 w-8 items-center justify-center"
        >
          <IconMenu />
        </button>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : "/search"}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex h-8 w-8 items-center justify-center"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? "dark:focus:border-primary/20 focus:border-contrast/20"
                : "focus:border-primary/20"
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form>
      </div>

      <Link
        className="flex h-full w-full flex-grow items-center justify-center self-stretch leading-[3rem] md:leading-[4rem]"
        to="/"
      >
        <Heading
          className="text-center font-bold leading-none"
          as={isHome ? "h1" : "h2"}
        >
          {title}
        </Heading>
      </Link>

      <div className="flex w-full items-center justify-end gap-4">
        <AccountLink className="relative flex h-8 w-8 items-center justify-center" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  )
}

function DesktopHeader({
  isHome,
  menu,
  openCart,
  title,
}: {
  isHome: boolean
  openCart: () => void
  menu?: EnhancedMenu
  title: string
}) {
  const params = useParams()
  const { y } = useWindowScroll()
  return (
    <header
      className={`${
        isHome
          ? "bg-primary/80 text-contrast shadow-darkHeader dark:bg-contrast/60 dark:text-primary"
          : "bg-contrast/80 text-primary"
      }${
        !isHome && y > 50 && "shadow-lightHeader"
      }sticky top-0 z-40 hidden h-nav w-full items-center justify-between gap-8 px-12 py-8 leading-none backdrop-blur-lg transition duration-300 lg:flex`}
    >
      <div className="flex gap-12">
        <Link className="font-bold" to="/" prefetch="intent">
          {title}
        </Link>
        <nav className="flex gap-8">
          {/* Top level menu items */}
          {(menu?.items || []).map((item) => (
            <Link
              key={item.id}
              to={item.to}
              target={item.target}
              prefetch="intent"
              className={({ isActive }) =>
                isActive ? "-mb-px border-b pb-1" : "pb-1"
              }
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-1">
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : "/search"}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? "dark:focus:border-primary/20 focus:border-contrast/20"
                : "focus:border-primary/20"
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button
            type="submit"
            className="relative flex h-8 w-8 items-center justify-center focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </Form>
        <AccountLink className="relative flex h-8 w-8 items-center justify-center focus:ring-primary/5" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  )
}

function AccountLink({ className }: { className?: string }) {
  const rootData = useRootLoaderData()
  const isLoggedIn = rootData?.isLoggedIn

  return (
    <Link to="/account" className={className}>
      <Suspense fallback={<IconLogin />}>
        <Await resolve={isLoggedIn} errorElement={<IconLogin />}>
          {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)}
        </Await>
      </Suspense>
    </Link>
  )
}

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean
  openCart: () => void
}) {
  const rootData = useRootLoaderData()

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  )
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number
  dark: boolean
  openCart: () => void
}) {
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

function Footer({ menu }: { menu?: EnhancedMenu }) {
  const isHome = useIsHomePath()
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : []

  return (
    <Section
      divider={isHome ? "none" : "top"}
      as="footer"
      role="contentinfo"
      className={`lg:grid-cols- grid min-h-[25rem] w-full grid-flow-row grid-cols-1 items-start gap-6 px-6 py-8 md:grid-cols-2 lg:gap-12 md:gap-8 lg:px-12 md:px-8${itemsCount}overflow-hidden bg-primary text-contrast dark:bg-contrast dark:text-primary`}
    >
      <FooterMenu menu={menu} />
      <CountrySelector />
      <div
        className={`self-end pt-8 opacity-50 lg:col-span- md:col-span-2${itemsCount}`}
      >
        &copy; {new Date().getFullYear()} / Shopify, Inc. Hydrogen is an MIT
        Licensed Open Source project.
      </div>
    </Section>
  )
}

function FooterLink({ item }: { item: ChildEnhancedMenuItem }) {
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

function FooterMenu({ menu }: { menu?: EnhancedMenu }) {
  const styles = {
    section: "grid gap-4",
    nav: "grid gap-2 pb-6",
  }

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? "up" : "down"} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? "h-fit max-h-48" : "max-h-0 md:max-h-fit"
                    }overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  )
}
