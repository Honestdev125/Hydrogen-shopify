import { appConfig } from "~/app-config"

export function findCategoryBySlug(slug: string) {
  return appConfig.product.categories.find((category) => {
    return category.slug === slug
  })
}
