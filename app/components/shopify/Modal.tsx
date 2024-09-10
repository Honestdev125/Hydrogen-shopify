import { IconClose, Link } from "~/components/shopify"

export function Modal({
  children,
  cancelLink,
}: {
  children: React.ReactNode
  cancelLink: string
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="modal-bg"
    >
      <div className="absolute inset-0 bg-primary/40 bg-opacity-75" />
      <div className="relative w-full rounded-3xl bg-white shadow-xl lg:w-2/6 sm:w-3/6 sm:rounded-lg">
        <div className="absolute top-0 right-0 pt-4 pr-4 sm:block">
          <Link
            to={cancelLink}
            className="-m-4 p-4 text-primary transition hover:text-primary/50"
          >
            <IconClose aria-label="Close panel" />
          </Link>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
