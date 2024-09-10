export function addAllItemsToSearchParams(
  searchParams: URLSearchParams,
  key: string,
  length: number,
): URLSearchParams {
  const text = searchParams.get(key)

  const currentItems = text?.split(".") ?? []

  if (currentItems.length === length) {
    searchParams.delete(key)
  }

  if (currentItems.length !== 0) {
    searchParams.delete(key)
  }

  return searchParams
}
