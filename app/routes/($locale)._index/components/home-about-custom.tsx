import { Badge } from "~/components/ui/badge"
import { ComingSoonImage } from "~/routes/($locale)._index/components/coming-soon-image"

/**
 * オリジナル商品をカスタマイズ
 * @returns
 */
export function HomeAboutCustom() {
  return (
    <section className="container">
      <div className="flex flex-col lg:flex-row md:px-16">
        <div className="space-y-8 lg:basis-5/12 lg:pr-16">
          <div className="space-y-4 lg:pt-8">
            <Badge className="rounded-sm px-6 py-1 font-normal text-xs">
              {"いつでも簡単にオーダーメイド"}
            </Badge>
            <h1 className="whitespace-pre-wrap text-3xl leading-tight">
              {"オリジナル商品を\nカスタマイズ"}
            </h1>
          </div>
          <div className="flex lg:hidden">
            <ComingSoonImage />
          </div>
          <div className="space-y-4 whitespace-pre-wrap px-4 text-sm leading-relaxed lg:px-0">
            <p>
              {
                "豊富な素材とデザインの中から、好みのパーツをカスタムデザインできます。"
              }
            </p>
            <p>
              {
                "自分だけの理想のシューズとウェアをあなたに。\nアバター作成をしなくても\n簡単にカスタマイズ可能です。"
              }
            </p>
          </div>
        </div>
        <div className="hidden lg:block lg:basis-7/12">
          <ComingSoonImage />
        </div>
      </div>
    </section>
  )
}
