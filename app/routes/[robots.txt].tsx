import type { LoaderFunctionArgs } from "@shopify/remix-oxygen"
import { toRobotsTxt } from "~/lib/to-robots-text"

export function loader(props: LoaderFunctionArgs) {
  const url = new URL(props.request.url)

  const value = toRobotsTxt({ url: url.origin })

  return new Response(value, {
    status: 200,
    headers: {
      "content-type": "text/plain",
      /**
       * Cache for 24 hours
       */
      "cache-control": `max-age=${60 * 60 * 24}`,
    },
  })
}
