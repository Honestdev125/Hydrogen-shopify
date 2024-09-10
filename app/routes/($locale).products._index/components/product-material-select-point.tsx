import { CircleIcon } from "lucide-react"
import { CustomDialogContent } from "~/components/custom/custom-dialog-content"
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"
import { HomeDot } from "~/routes/($locale)._index/components/home-dot"

export default function ProductMaterialSelectPoint() {
  const description =
    "オンラインショップでの靴の購入は、サイズ選びが難しいと感じる方も多いことと思います。\n実際のショップではスタッフと一緒にサイズ合わせができますが、オンラインショップですとご自身でのフィッティングが心配となります。オンラインで購入されるときでも心配が少なくお選びいただけるよう、ご自身の足や靴のことを知りサイズ選びの参考としていただけるようサイズ選びのポイントをご案内いたします。"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 text-sm opacity-60"
        >
          <CircleIcon className="w-4" />
          <span>{"素材選びのポイント"}</span>
        </button>
      </DialogTrigger>
      <CustomDialogContent className="max-w-80 rounded-2xl px-0 pt-16 pb-0 md:max-w-2xl">
        <ScrollArea className="h-full max-h-[80vh] overflow-auto px-8">
          <div className="space-y-4 pb-8">
            <DialogHeader className="w-full space-y-4">
              <DialogTitle>{"素材選びのポイント"}</DialogTitle>
            </DialogHeader>
            <p className="whitespace-pre-wrap text-xs leading-normal opacity-80">
              {description}
            </p>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-x-2">
                <HomeDot />
                <p className="font-bold">{"カーフスキン"}</p>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="h-32 max-w-80 rounded bg-neutral-200 md:w-48" />
                <div className="flex-1">
                  <p className="whitespace-pre-wrap text-xs leading-normal">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-x-2">
                <HomeDot />
                <p className="font-bold">{"オーストリッチ"}</p>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="h-32 max-w-80 rounded bg-neutral-200 md:w-48" />
                <div className="flex-1">
                  <p className="whitespace-pre-wrap text-xs leading-normal">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-x-2">
                <HomeDot />
                <p className="font-bold">{"ディアスキン"}</p>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="h-32 max-w-80 rounded bg-neutral-200 md:w-48" />
                <div className="flex-1">
                  <p className="whitespace-pre-wrap text-xs leading-normal">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-x-2">
                <HomeDot />
                <p className="font-bold">{"二口ティカス（背）"}</p>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="h-32 max-w-80 rounded bg-neutral-200 md:w-48" />
                <div className="flex-1">
                  <p className="whitespace-pre-wrap text-xs leading-normal">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-x-2">
                <HomeDot />
                <p className="font-bold">{"二口ティカス（腹）"}</p>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="h-32 max-w-80 rounded bg-neutral-200 md:w-48" />
                <div className="flex-1">
                  <p className="whitespace-pre-wrap text-xs leading-normal">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CustomDialogContent>
    </Dialog>
  )
}
