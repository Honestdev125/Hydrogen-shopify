import { Image } from "@shopify/hydrogen"
import type { ArticleFragment } from "storefrontapi.generated"
import { Card, CardContent } from "~/components/ui/card"

type Props = {
  blogHandle: string
  article: ArticleFragment
  loading?: HTMLImageElement["loading"]
}

export function ArticleCard(props: Props) {
  return (
    <Card>
      <CardContent className={"p-4"}>
        {props.article.image && (
          <div className="card-image aspect-[3/2]">
            <Image
              alt={props.article.image.altText || props.article.title}
              className="w-full object-cover"
              data={props.article.image}
              aspectRatio="3/2"
              loading={props.loading}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}
        <div className="space-y-1">
          <h2 className="font-medium">{props.article.title}</h2>
          <span className="block">{props.article.publishedAt}</span>
        </div>
      </CardContent>
    </Card>
  )
}
