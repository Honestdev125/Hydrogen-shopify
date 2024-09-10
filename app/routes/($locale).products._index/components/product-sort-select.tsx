import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

export function ProductSortSelect() {
  return (
    <Select defaultValue="recommended" disabled>
      <SelectTrigger className="w-40 rounded-full">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="recommended">{"おすすめ順"}</SelectItem>
          <SelectItem value="new">{"新着順"}</SelectItem>
          <SelectItem value="popular">{"人気順"}</SelectItem>
          <SelectItem value="cheep">{"価格の安い順"}</SelectItem>
          <SelectItem value="expensive">{"価格の高い順"}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
