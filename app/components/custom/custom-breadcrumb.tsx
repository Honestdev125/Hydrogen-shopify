import { Fragment } from "react/jsx-runtime"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

type Item = {
  title: string
  href: string
}

type Props = {
  items: Item[]
}

export function CustomBreadcrumb(props: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs opacity-80">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{"TOP"}</BreadcrumbLink>
        </BreadcrumbItem>
        {props.items.map((item) => (
          <Fragment key={item.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem key={item.href}>
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
