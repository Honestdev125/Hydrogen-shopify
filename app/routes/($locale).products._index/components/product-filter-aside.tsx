import { CustomAccordionTrigger } from "~/components/custom/custom-accordion-trigger"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "~/components/ui/accordion"
import ProductMaterialSelectPoint from "~/routes/($locale).products._index/components/product-material-select-point"

type Props = {
  category: React.ReactNode
  material: React.ReactNode
  color: React.ReactNode
  price: React.ReactNode
  process: React.ReactNode
  brand: React.ReactNode
  scene: React.ReactNode
}

/**
 * Aside component for product filter
 * @returns
 */
export function ProductFilterAside(props: Props) {
  return (
    <aside className="hidden w-full max-w-64 pb-4 md:block">
      <Accordion
        className="w-full"
        type="multiple"
        defaultValue={[
          "category",
          "material",
          "color",
          "price",
          "bid",
          "process",
          "brand",
          "scene",
        ]}
      >
        <AccordionItem value="category">
          <CustomAccordionTrigger className="text-sm">
            {"カテゴリー"}
          </CustomAccordionTrigger>
          <AccordionContent className="pb-0 pl-4">
            {props.category}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="material">
          <CustomAccordionTrigger className="text-sm">
            {"素材"}
          </CustomAccordionTrigger>
          <AccordionContent>
            <ProductMaterialSelectPoint />
            <div className="pt-4 pl-4">{props.material}</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="color">
          <CustomAccordionTrigger className="text-sm">
            {"カラー"}
          </CustomAccordionTrigger>
          <AccordionContent className="pl-4">{props.color}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <CustomAccordionTrigger className="text-sm">
            {"価格"}
          </CustomAccordionTrigger>
          <AccordionContent className="pl-4">{props.price}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="process">
          <CustomAccordionTrigger className="text-sm">
            {"製法"}
          </CustomAccordionTrigger>
          <AccordionContent className="pl-4">{props.process}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <CustomAccordionTrigger className="text-sm">
            {"ブランド"}
          </CustomAccordionTrigger>
          <AccordionContent className="pl-4">{props.brand}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="scene">
          <CustomAccordionTrigger className="text-sm">
            {"シーン"}
          </CustomAccordionTrigger>
          <AccordionContent className="pl-4">{props.scene}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}
