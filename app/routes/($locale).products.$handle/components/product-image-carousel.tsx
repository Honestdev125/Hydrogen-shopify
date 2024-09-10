import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"

type Props = {
  children: React.ReactNode
}

export function ProductImageCarousel(props: Props) {
  return (
    <Carousel className="relative w-full">
      <CarouselContent>{props.children}</CarouselContent>
      <CarouselPrevious className="left-4 border-none" />
      <CarouselNext className="right-4 border-none" />
    </Carousel>
  )
}
