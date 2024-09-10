import { Badge } from "~/components/ui/badge"
import { ComingSoonImage } from "~/routes/($locale)._index/components/coming-soon-image"

/**
 * スマホで自分自身のリアルアバターが試着
 * @returns
 */
export function HomeAboutAvatar() {
  return (
    <section className="md:container">
      <div className="flex rounded-3xl bg-gray-200 px-4 py-16 md:flex-row lg:gap-x-8 md:gap-x-2 lg:px-16 md:px-16 sm:px-8 lg:py-12">
        <div className="hidden lg:block lg:basis-5/12">
          <ComingSoonImage />
        </div>
        <div className="w-full space-y-8 lg:basis-7/12 lg:pr-16 lg:pl-16">
          <div className="space-y-4">
            <Badge className="rounded-sm px-6 py-1 font-normal text-xs">
              {"UNINOVERSEのバーチャル試着は"}
            </Badge>
            <h1 className="whitespace-pre-wrap text-3xl leading-tight">
              {"スマホで自分自身の\nリアルアバターが試着"}
            </h1>
          </div>
          <div className="flex lg:hidden">
            <ComingSoonImage />
          </div>
          <div className="px-4 text-sm leading-relaxed lg:px-0">
            <p>{"直感的な試着体験をスマホ一つで。"}</p>
            <p>
              {
                "アバターを360°見渡して、リアルなサイズ感をチェックできるから、\n店舗での試着が不要に。"
              }
            </p>
            <p>{"体形に合わせた着こなしや着丈感をスマホで確認できます。"}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
