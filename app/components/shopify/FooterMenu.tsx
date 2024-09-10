import { Link } from "@remix-run/react"

export function FooterMenu() {
  return (
    <section className="flex space-x-4">
      <div className="min-w-48 space-y-4">
        <Link className="block text-sm text-white" to={"/products"}>
          {"商品一覧"}
        </Link>
        <Link
          className="block text-sm text-white"
          to={"/products?category=leather-shoes"}
        >
          {"革靴"}
        </Link>
        <Link
          className="block text-sm text-white"
          to={"/products?category=boots"}
        >
          {"ブーツ"}
        </Link>
        <Link
          className="block text-sm text-white"
          to={"/products?category=sneakers"}
        >
          {"スニーカー"}
        </Link>
        <Link
          className="block text-sm text-white"
          to={"/products?category=golf-shoes"}
        >
          {"ゴルフシューズ"}
        </Link>
        <Link
          className="block text-sm text-white"
          to={"/products?category=golf-wear"}
        >
          {"ゴルフウェア"}
        </Link>
        {/* <Link className="text-sm text-white">{"アクセサリー・小物"}</Link> */}
      </div>
    </section>
  )
}
