import { appConfig } from "~/app-config"

export function findSubCategoryBySlug(slug: string) {
  const subCategories = appConfig.product.categories.flatMap((category) => {
    return category.children.flat()
  })

  return subCategories.find((subCategory) => subCategory.slug === slug)
}
