import type { CustomerDetailsFragment } from "customer-accountapi.generated"
import { Link } from "~/components/shopify"

export function AccountDetails({
  customer,
}: {
  customer: CustomerDetailsFragment
}) {
  const { firstName, lastName, emailAddress, phoneNumber } = customer

  return (
    <>
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 lg:p-12 md:p-8">
        <h3 className="font-bold text-lead">Account Details</h3>
        <div className="rounded border border-gray-200 p-6 lg:p-8">
          <div className="flex">
            <h3 className="flex-1 font-bold text-base">Profile</h3>
            <Link
              prefetch="intent"
              className="font-normal text-sm underline"
              to="/account/edit"
            >
              Edit
            </Link>
          </div>
          <div className="mt-4 text-primary/50 text-sm">Name</div>
          <p className="mt-1">
            {firstName || lastName
              ? (firstName ? `${firstName} ` : "") + lastName
              : "Add name"}{" "}
          </p>

          <div className="mt-4 text-primary/50 text-sm">Phone number</div>
          <p className="mt-1">{phoneNumber?.phoneNumber ?? "N/A"}</p>

          <div className="mt-4 text-primary/50 text-sm">Email address</div>
          <p className="mt-1">{emailAddress?.emailAddress ?? "N/A"}</p>
        </div>
      </div>
    </>
  )
}
