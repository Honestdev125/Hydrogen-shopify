import { Separator } from "~/components/ui/separator"
import { HomeSectionHeader } from "~/routes/($locale)._index/components/home-section-header"

export function HomeStore() {
  return (
    <div className="container space-y-8">
      <HomeSectionHeader title={"STORE"} subTitle={"店舗"} />
      <div className="flex w-full flex-col justify-center gap-x-8 space-y-4 md:w-auto md:flex-row md:space-y-8 md:px-16">
        <div className="space-y-4 md:w-80">
          <h1 className="">{"FUJl UNl OMOTESANDO"}</h1>
          <div>
            <Separator />
            <div className="flex items-start justify-start gap-x-4 py-4 text-xs">
              <h6 className="w-16">{"ADDRESS"}</h6>
              <div>
                <p>{"000-0000"}</p>
                <span>{"東京都渋谷区神宮前〇〇-〇〇"}</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-start justify-start space-x-4 py-4 text-xs">
              <h6 className="w-16">{"OPEN"}</h6>
              <p>{"00:00-00:00"}</p>
            </div>
            <Separator />
            <div className="flex items-start justify-start space-x-4 py-4 text-xs">
              <h6 className="w-16">{"TEL"}</h6>
              <p>{"03-1234-5678"}</p>
            </div>
            <Separator />
            <div className="flex items-start justify-start space-x-4 py-4 text-xs">
              <h6 className="w-16">{"MAIL"}</h6>
              <p>{"fujiuni_omotesando@fujiuni.jp"}</p>
            </div>
            <Separator />
          </div>
        </div>
        <div>
          <iframe
            title="map"
            className="h-64 w-full pt-2 md:h-full md:w-80"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831443.6189430079!2d139.11043696813763!3d35.508564749251896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x605d1b87f02e57e7%3A0x2e01618b22571b89!2z5p2x5Lqs6YO9!5e0!3m2!1sja!2sjp!4v1711554868411!5m2!1sja!2sjp"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
