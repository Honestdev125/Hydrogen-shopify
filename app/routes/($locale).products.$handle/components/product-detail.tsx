import { Disclosure } from "@headlessui/react"
import clsx from "clsx"
import { IconClose, Link, Text } from "~/components/shopify"

type Props = {
  title: string
  content: string
  learnMore?: string
}

export function ProductDetail(props: Props) {
  return (
    <Disclosure key={props.title} as="div" className="grid w-full gap-2">
      {({ open }) => (
        <>
          <Disclosure.Button className="text-left">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {props.title}
              </Text>
              <IconClose
                className={clsx(
                  "transform-gpu transition-transform duration-200",
                  !open && "rotate-[45deg]",
                )}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={"grid gap-2 pt-2 pb-4"}>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: props.content }}
            />
            {props.learnMore && (
              <div className="">
                <Link
                  className="border-primary/30 border-b pb-px text-primary/50"
                  to={props.learnMore}
                >
                  Learn more
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
