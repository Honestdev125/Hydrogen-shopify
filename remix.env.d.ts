/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

import type { HydrogenCart } from "@shopify/hydrogen"
import type { AppSession } from "~/lib/session.server"
import type { CustomerAccount, Storefront } from "~/lib/type"

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: { env: { NODE_ENV: "production" | "development" } }

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    SESSION_SECRET: string
    PUBLIC_STOREFRONT_API_TOKEN: string
    PRIVATE_STOREFRONT_API_TOKEN: string
    PUBLIC_STORE_DOMAIN: string
    PUBLIC_STOREFRONT_ID: string
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: string
  }
}

declare module "@shopify/remix-oxygen" {
  /**
   * Declare local additions to the Remix loader context.
   */
  export interface AppLoadContext {
    waitUntil: ExecutionContext["waitUntil"]
    session: AppSession
    storefront: Storefront
    customerAccount: CustomerAccount
    cart: HydrogenCart
    env: Env
  }
}
