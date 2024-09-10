import { useState } from "react"
import { CustomSlider } from "~/components/custom/custom-slider"
import { Button } from "~/components/ui/button"

type Props = {
  min: number
  max: number
  onChange(values: [number, number]): void
}

export function ProductPriceFilter(props: Props) {
  const [text, setText] = useState("¥60,000")

  const onClickMax = () => {
    setText(text === "¥60,000" ? "上限なし" : "¥60,000")
  }

  return (
    <div className="space-y-4">
      <div className="pt-3 pr-2">
        <CustomSlider
          min={0}
          max={400000}
          minStepsBetweenThumbs={2}
          step={10000}
          defaultValue={[0, 80000]}
          value={[props.min, props.max]}
          onValueChange={(value) => {
            const [min, max] = value
            props.onChange([min, max])
          }}
        />
      </div>

      <div className="mt-2 flex justify-between">
        <Button
          variant="secondary"
          size={"sm"}
          className="min-w-16 rounded-full text-xs"
        >
          {`¥${props.min}`}
        </Button>
        <Button
          variant="secondary"
          size={"sm"}
          className="min-w-16 rounded-full text-xs"
          onClick={onClickMax}
        >
          {`¥${props.max}`}
        </Button>
      </div>
    </div>
  )
}
