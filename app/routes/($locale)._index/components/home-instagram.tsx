/**
 * INSTAGRAM
 * @returns
 */
export function HomeInstagram() {
  const posts = [
    {
      imageURL:
        "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/instagram-C4zogVELHrv.jpg?v=1711934862",
      pageId: "C4zogVELHrv",
    },
    {
      imageURL:
        "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/instagram-CamxztvjKrK.jpg?v=1711892946",
      pageId: "CamxztvjKrK",
    },
    {
      imageURL:
        "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/instagram-CamyCLWj1aW.jpg?v=1711892946",
      pageId: "CamyCLWj1aW",
    },
    {
      imageURL:
        "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/instagram-CbDCNq0jwYm.jpg?v=1711892946",
      pageId: "CbDCNq0jwYm",
    },
    {
      imageURL:
        "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/instagram-C2POeQwvZ0u.jpg?v=1711892945",
      pageId: "C2POeQwvZ0u",
    },
    {
      imageURL:
        "https://cdn.shopify.com/s/files/1/0634/9350/5207/files/instagram-CapYFaDutNI.jpg?v=1711892946",
      pageId: "CapYFaDutNI",
    },
  ]

  return (
    <section className="container space-y-8">
      <h1 className="text-center text-xl">{"INSTAGRAM"}</h1>
      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-3 md:px-16">
        {posts.map((post) => (
          <a
            key={post.pageId}
            className="block h-full w-full"
            href={`https://www.instagram.com/p/${post.pageId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="h-full w-full rounded object-cover"
              alt={"Instagram Post"}
              src={post.imageURL}
            />
          </a>
        ))}
      </div>
    </section>
  )
}
