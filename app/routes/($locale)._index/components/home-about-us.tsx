import { Badge } from "~/components/ui/badge"
import { ComingSoonImage } from "~/routes/($locale)._index/components/coming-soon-image"
import { HomeSectionHeader } from "~/routes/($locale)._index/components/home-section-header"

/**
 * WHAT IS UNINOVERSE?
 * わたしたちについて
 * @returns
 */
export function HomeAboutUs() {
  return (
    <section className="container space-y-8">
      <HomeSectionHeader
        title={"WHAT IS UNINOVERSE?"}
        subTitle={"わたしたちについて"}
      />
      <div className="flex flex-col lg:flex-row md:px-16">
        <div className="space-y-8 lg:basis-5/12 lg:pr-16">
          <div className="space-y-4">
            <Badge className="rounded-sm px-6 py-1 font-normal text-xs">
              {"気軽に簡単に"}
            </Badge>
            <h1 className="whitespace-pre-wrap text-3xl leading-tight">
              {"バーチャル試着で\nもっと自由な買い物を"}
            </h1>
          </div>
          <div className="flex lg:hidden">
            <ComingSoonImage />
          </div>
          <div className="space-y-4 whitespace-pre-wrap px-4 text-sm leading-relaxed lg:px-0">
            <p>
              {
                "ネットで届いた商品を着てみたらイメージが違う、着丈やサイズ感がわからなくて不安。"
              }
            </p>
            <p>
              {
                "UNINOVERSEなら、3Dの洋服を自分そっくりのアバターに、スマホ上で試着ができるから、安心してお買い物ができます。"
              }
            </p>
            <p>{"試着を自由自在に。\nあなたにぴったりの商品に出会えます。"}</p>
          </div>
        </div>
        <div className="hidden lg:block lg:basis-7/12">
          <ComingSoonImage />
        </div>
      </div>
    </section>
  )
}
