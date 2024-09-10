import { Link } from "@remix-run/react"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { HomeSectionHeader } from "~/routes/($locale)._index/components/home-section-header"

type Props = {
  children: React.ReactNode
}

/**
 * RECOMMENDED
 * おすすめ商品
 */
export function HomeRecommended(props: Props) {
  return (
    <section className="container w-full space-y-8">
      <HomeSectionHeader title={"RECOMMENDED"} subTitle={"おすすめ商品"} />
      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-3 md:px-16">
        {props.children}
      </div>
      <div className="flex w-full justify-center">
        <Link to={"/products"} className="block w-full max-w-80">
          <Button
            size={"lg"}
            variant={"outline"}
            className="w-full space-x-2 rounded-full"
          >
            <span className="font-normal">{"VIEW MORE"}</span>
            <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </div>
    </section>
  )
}
