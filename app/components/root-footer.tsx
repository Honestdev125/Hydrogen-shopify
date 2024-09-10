import { appConfig } from "~/app-config"
import { FooterLogo } from "~/components/footer-logo"
import { FooterSecondMenu } from "~/components/footer-second-menu"
import { FooterMenu } from "~/components/shopify/FooterMenu"

export function RootFooter() {
  return (
    <footer className="container flex flex-col justify-start space-y-8 py-4 md:flex-row md:py-8">
      <div className="flex h-full w-full flex-col justify-start space-y-8 rounded-3xl bg-neutral-800 px-8 pt-16 pb-12">
        <div className="flex flex-col space-y-8 md:flex-row">
          <div className="flex justify-start md:basis-7/12 md:pl-16">
            <FooterLogo />
          </div>
          <div className="my-0 flex h-full flex-col space-y-8 pb-8 md:basis-5/12 md:flex-row md:space-y-0">
            <FooterMenu />
            <FooterSecondMenu />
          </div>
        </div>
        <div
          className="pb-2 text-white text-xs opacity-80"
          style={{ textAlign: "right" }}
        >
          &copy; {new Date().getFullYear()} {appConfig.site.name}
        </div>
      </div>
    </footer>
  )
}
