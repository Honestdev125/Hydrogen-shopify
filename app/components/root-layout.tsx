import type { LayoutQuery } from "storefrontapi.generated"
import { RootFooter } from "~/components/root-footer"
import { RootHeader } from "~/components/root-header"
import type { EnhancedMenu } from "~/lib/utils"

type LayoutProps = {
  children: React.ReactNode
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null
    footerMenu?: EnhancedMenu | null
  }
}

export function RootLayout(props: LayoutProps) {
  return (
    <>
      <RootHeader title={props.layout?.shop.name ?? "-"} />
      {props.children}
      <RootFooter />
    </>
  )
}
