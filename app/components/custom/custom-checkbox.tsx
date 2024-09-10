import { Checkbox } from "~/components/ui/checkbox"

/**
 * Checkbox with label
 * @returns
 */
export function CustomCheckbox() {
  return (
    <div className="flex items-center gap-x-2">
      <Checkbox />
      <label className="text-sm">{"全ての素材"}</label>
    </div>
  )
}
