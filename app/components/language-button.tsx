import { appConfig } from "~/app-config"
import { Button } from "~/components/ui/button"

export function LanguageButton() {
  return (
    <Button
      disabled={!appConfig.features.languageSwitcher}
      variant={"outline"}
      size={"sm"}
      className="h-6 rounded-full px-4"
    >
      {"JP"}
    </Button>
  )
}
