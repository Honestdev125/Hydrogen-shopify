type Props = {
  imageURL?: string
  title: string
}

export function RecommendedProductCard(props: Props) {
  return (
    <div className="space-y-2">
      <img alt="" src={props.imageURL} />
      <p className="text-sm">{props.title}</p>
    </div>
  )
}
