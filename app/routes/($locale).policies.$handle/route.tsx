import { Link, useLoaderData } from "@remix-run/react"
import { type LoaderFunctionArgs, json } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { Button } from "~/components/ui/button"
import { routeHeaders } from "~/data/cache"
import { seoPayload } from "~/lib/seo.server"
import { POLICY_CONTENT_QUERY } from "~/routes/($locale).policies.$handle/components/policy-content-query"

type PolicyName =
  | "privacyPolicy"
  | "shippingPolicy"
  | "termsOfService"
  | "refundPolicy"

export const headers = routeHeaders

export async function loader(props: LoaderFunctionArgs) {
  invariant(props.params.handle, "Missing policy handle")

  const policyName = props.params.handle.replace(
    /-([a-z])/g,
    (_: unknown, m1: string) => {
      return m1.toUpperCase()
    },
  ) as PolicyName

  const data = await props.context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: props.context.storefront.i18n.language,
    },
  })

  invariant(data, "No data returned from Shopify API")

  const policy = data.shop?.[policyName]

  if (!policy) {
    throw new Response(null, { status: 404 })
  }

  const seo = seoPayload.policy({ policy, url: props.request.url })

  return json({ policy, seo })
}

export default function PolicyPage() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="container space-y-4 pt-4">
      <header>
        <h1>{data.policy.title}</h1>
      </header>
      <div
        className={"znc font-medium"}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: data.policy.body }}
      />
    </main>
  )
}
