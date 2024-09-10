import type { SetURLSearchParams } from "react-router-dom"
import { appConfig } from "~/app-config"
import { addAllItemsToSearchParams } from "~/lib/router/add-all-items-to-search-params"
import { addItemToSearchParams } from "~/lib/router/add-item-to-search-params"

/**
 * 商品の一覧の絞り込み機能
 * @param searchParams
 * @param setSearchParams
 * @returns
 */
export function useProductListFilter(
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
) {
  const setCategory = (payload: string | null) => {
    if (payload === null) {
      searchParams.delete("category")
    }
    if (payload) {
      searchParams.set("category", payload)
    }
    setSearchParams(searchParams, { replace: true, preventScrollReset: true })
  }

  const addMaterial = (payload: string) => {
    const draft = addItemToSearchParams(
      searchParams,
      "materials",
      payload,
      appConfig.product.materiels.length,
    )
    setSearchParams(draft, { replace: true, preventScrollReset: true })
  }

  const addAllMaterials = () => {
    const draft = addAllItemsToSearchParams(
      searchParams,
      "materials",
      appConfig.product.materiels.length,
    )
    setSearchParams(draft, { replace: true, preventScrollReset: true })
  }

  const addColor = (payload: string) => {
    const draft = addItemToSearchParams(
      searchParams,
      "colors",
      payload,
      appConfig.product.colors.length,
    )
    setSearchParams(draft, { replace: true, preventScrollReset: true })
  }

  const addMethod = (payload: string) => {
    const draft = addItemToSearchParams(
      searchParams,
      "methods",
      payload,
      appConfig.product.methods.length,
    )
    setSearchParams(draft, { replace: true, preventScrollReset: true })
  }

  const addAllMethods = () => {
    const draft = addAllItemsToSearchParams(
      searchParams,
      "methods",
      appConfig.product.methods.length,
    )
    setSearchParams(draft, { replace: true, preventScrollReset: true })
  }

  const addBrand = (payload: string) => {
    const draft = addItemToSearchParams(
      searchParams,
      "brands",
      payload,
      appConfig.product.brands.length,
    )
    setSearchParams(draft, { replace: true, preventScrollReset: true })
  }

  const addAllBrands = () => {
    const draft = addAllItemsToSearchParams(
      searchParams,
      "brands",
      appConfig.product.brands.length,
    )
    setSearchParams(draft, { replace: true, preventScrollReset: true })
  }

  const addScene = (payload: string) => {
    const draft = addItemToSearchParams(
      searchParams,
      "scenes",
      payload,
      appConfig.product.cases.length,
    )
    setSearchParams(draft, { replace: true, preventScrollReset: true })
  }

  const setPriceRange = (payload: [number, number]) => {
    const [min, max] = payload
    searchParams.set("price", `${min}.${max}`)
    setSearchParams(searchParams, { replace: true, preventScrollReset: true })
  }

  const reset = () => {
    const keys = [
      "category",
      "colors",
      "materials",
      "methods",
      "brands",
      "scenes",
      "price",
    ]
    for (const key of keys) {
      searchParams.delete(key)
    }
    setSearchParams(searchParams, { replace: true, preventScrollReset: true })
  }

  const [minPrice = 0, maxPrice = 40000] =
    searchParams.get("price")?.split(".").map(Number) ?? []

  return {
    priceRange: { min: minPrice, max: maxPrice },
    category: searchParams.get("category") ?? null,
    colors: searchParams.get("colors")?.split(".") ?? [],
    materials: searchParams.get("materials")?.split(".") ?? [],
    methods: searchParams.get("methods")?.split(".") ?? [],
    brands: searchParams.get("brands")?.split(".") ?? [],
    scenes: searchParams.get("scenes")?.split(".") ?? [],
    setCategory,
    setPriceRange,
    addMaterial,
    addAllMaterials,
    addColor,
    addMethod,
    addAllMethods,
    addBrand,
    addAllBrands,
    addScene,
    reset,
  }
}
