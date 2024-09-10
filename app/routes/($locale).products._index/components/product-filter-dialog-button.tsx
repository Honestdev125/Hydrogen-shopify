import { Settings2 } from "lucide-react"
import { CustomAccordionTrigger } from "~/components/custom/custom-accordion-trigger"
import { CustomDialogContent } from "~/components/custom/custom-dialog-content"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
import { Dialog, DialogTrigger } from "~/components/ui/dialog"
import { ScrollArea } from "~/components/ui/scroll-area"
import ProductMaterialSelectPoint from "~/routes/($locale).products._index/components/product-material-select-point"

type Props = {
  category: React.ReactNode
  material: React.ReactNode
  color: React.ReactNode
  price: React.ReactNode
  process: React.ReactNode
  brand: React.ReactNode
  scene: React.ReactNode
  onReset(): void
}

export function ProductFilterDialogButton(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-40 items-center justify-between space-x-4 rounded-full md:hidden"
        >
          <p>{"絞り込む"}</p>
          <Settings2 className="w-4 opacity-80" />
        </Button>
      </DialogTrigger>
      <CustomDialogContent className="max-w-80 rounded-2xl px-0 pt-16 pb-0 md:max-w-auto">
        <ScrollArea className="h-full max-h-[80vh] overflow-auto px-4">
          <div className="pb-4">
            <Accordion
              className="w-full"
              type="multiple"
              defaultValue={["category"]}
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
                <AccordionContent className="pl-4">
                  {props.color}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <CustomAccordionTrigger className="text-sm">
                  {"価格"}
                </CustomAccordionTrigger>
                <AccordionContent className="pl-4">
                  {props.price}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="process">
                <CustomAccordionTrigger className="text-sm">
                  {"製法"}
                </CustomAccordionTrigger>
                <AccordionContent className="pl-4">
                  {props.process}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="brand">
                <CustomAccordionTrigger className="text-sm">
                  {"ブランド"}
                </CustomAccordionTrigger>
                <AccordionContent className="pl-4">
                  {props.brand}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="scene">
                <CustomAccordionTrigger className="text-sm">
                  {"シーン"}
                </CustomAccordionTrigger>
                <AccordionContent className="pl-4">
                  {props.scene}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex justify-center space-x-2 pb-4">
            <Button
              variant="outline"
              className="flex-1 rounded-full"
              onClick={props.onReset}
            >
              {"クリア"}
            </Button>
            {/* <Button className="flex-1 rounded-full">{"絞り込みを適用"}</Button> */}
          </div>
        </ScrollArea>
      </CustomDialogContent>
    </Dialog>
  )
}
