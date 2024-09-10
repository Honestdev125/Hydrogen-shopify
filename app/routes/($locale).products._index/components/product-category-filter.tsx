import { appConfig } from "~/app-config"
import { CustomAccordionTrigger } from "~/components/custom/custom-accordion-trigger"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "~/components/ui/accordion"
import { cn } from "~/lib/cn"

type Props = {
  value: string | null
  onChangeCategory(category: string | null): void
}

export function ProductCategoryFilter(props: Props) {
  const length = appConfig.product.categories.length

  return (
    <Accordion className="w-full" type="multiple" defaultValue={[]}>
      <AccordionItem value={""}>
        <button
          type={"button"}
          className={cn("w-full py-4 text-left text-sm", {
            "font-bold": props.value === null,
          })}
          onClick={() => {
            props.onChangeCategory(null)
          }}
        >
          {"すべてのアイテム"}
        </button>
      </AccordionItem>
      {appConfig.product.categories.map((item, index) => (
        <AccordionItem
          key={item.slug}
          value={item.slug}
          className={cn({ "border-none": length === index + 1 })}
        >
          <CustomAccordionTrigger className="text-sm">
            {item.name}
          </CustomAccordionTrigger>
          <AccordionContent className="space-y-4 pb-4 pl-4">
            <button
              type="button"
              aria-label="Product Category Filter"
              className={cn("block text-sm", {
                "font-bold": props.value === item.slug,
              })}
              onClick={() => {
                props.onChangeCategory(item.slug)
              }}
            >
              {`全ての${item.name}`}
            </button>
            {item.children.map((childItem) => (
              <button
                key={childItem.slug}
                type="button"
                aria-label="Product Category Filter"
                className={cn("block text-sm", {
                  "font-bold": props.value === childItem.slug,
                })}
                onClick={() => {
                  props.onChangeCategory(childItem.slug)
                }}
              >
                {childItem.name}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
