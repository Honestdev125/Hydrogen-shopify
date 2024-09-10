type Props = {
  url: string
  lastMod?: string
  changeFreq?: string
  image?: {
    url: string
    title?: string
    caption?: string
  }
}

export function renderUrlTag({ url, lastMod, changeFreq, image }: Props) {
  return `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>${changeFreq}</changefreq>
      ${
        image
          ? `
        <image:image>
          <image:loc>${image.url}</image:loc>
          <image:title>${image.title ?? ""}</image:title>
          <image:caption>${image.caption ?? ""}</image:caption>
        </image:image>`
          : ""
      }

    </url>
  `
}
