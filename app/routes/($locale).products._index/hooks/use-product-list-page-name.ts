import { appConfig } from "~/app-config"

export function useProductListPageName(value: string | null) {
  if (value === null) {
    return "全てのアイテム"
  }

  for (const category of appConfig.product.categories) {
    if (category.slug === value) {
      return `全ての${category.name}`
    }
  }

  for (const category of appConfig.product.categories) {
    for (const child of category.children) {
      if (child.slug === value) {
        return `全ての${child.name}`
      }
    }
  }

  return "不明"
}
