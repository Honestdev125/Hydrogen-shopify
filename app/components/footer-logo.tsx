import { appConfig } from "~/app-config"

export function FooterLogo() {
  return (
    <div className="flex h-full w-full items-center">
      <p className="text-3xl text-white">{appConfig.site.name}</p>
    </div>
  )
}
