import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "~/lib/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        bgred: "bg-red-500 text-reddish-500 hover:bg-red-500/90",
        bgblue: "bg-blue-500 text-blueish-500 hover:bg-blue-500/90",
        bgpurple: "bg-purple-500 text-purpleish-500 hover:bg-purple-500/90",
        bgyellow: "bg-yellow-500 text-yellowish-500 hover:bg-yellow-500/90",
        bgorange: "bg-orange-500 text-orangeish-500 hover:bg-orange-500/90",
        bgpink: "bg-pink-500 text-pinkish-500 hover:bg-pink-500/90",
        bggreen: "bg-green-500 text-greenish-500 hover:bg-green-500/90",
        bggray: "bg-gray-300 text-grayish-500 hover:bg-gray-500/90",
        bgbrown:
          "bg-grey-100 text-brownish-500 hover:bg-brown-500/90 text-black border border-outline border-gray-200",
        bgteal: "bg-teal-500 text-tealish-500 hover:bg-teal-500/90",
        bgindigo: "bg-indigo-500 text-indigoish-500 hover:bg-indigo-500/90",
        bgviolet: "bg-orange-200 text-violetish-500 hover:bg-orange-500/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-16 rounded-3xl px-20 mt-11",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "lg",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
