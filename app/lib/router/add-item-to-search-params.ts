export function addItemToSearchParams(
  searchParams: URLSearchParams,
  key: string,
  payload: string,
  length: number,
): URLSearchParams {
  const text = searchParams.get(key)

  const items = text ? text.split(".") : []

  if (items.includes(payload)) {
    items.splice(items.indexOf(payload), 1)
  } else {
    items.push(payload)
  }

  if (items.length === 0) {
    searchParams.delete(key)
  }

  if (items.length === length) {
    searchParams.delete(key)
  }

  if (items.length !== length && items.length !== 0) {
    searchParams.set(key, items.join("."))
  }

  return searchParams
}
