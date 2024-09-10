type Props = {
  imageUrl: string
  categoryName: string
}

export const ProductCategoryCard = (props: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex h-40 items-center justify-center rounded-2xl bg-gray-100 p-4">
        <img src={props.imageUrl} alt="" className="h-full object-contain" />
      </div>
      <p className="flex justify-center text-sm">{props.categoryName}</p>
    </div>
  )
}
