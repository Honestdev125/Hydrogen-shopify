import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Minus, Plus } from "lucide-react"
import * as React from "react"
import { cn } from "~/lib/cn"

export const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 transition-all [&[data-state=closed]>div>.off]:hidden [&[data-state=open]>div>.on]:hidden",
        className,
      )}
      {...props}
    >
      {children}
      <div>
        <Plus className="on h-4 w-4 shrink-0" />
        <Minus className="off h-4 w-4 shrink-0" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

CustomAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName
