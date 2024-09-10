import { HomeDot } from "~/routes/($locale)._index/components/home-dot"

type Props = {
  title: string
  subTitle: string
}

export function HomeSectionHeader(props: Props) {
  return (
    <div className="flex items-start gap-x-2">
      <div className="flex h-6 items-center">
        <HomeDot />
      </div>
      <div>
        <p className="text-xl">{props.title}</p>
        <h3 className="text-xs opacity-60">{props.subTitle}</h3>
      </div>
    </div>
  )
}
