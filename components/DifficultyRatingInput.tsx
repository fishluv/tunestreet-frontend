import { useState } from "react"
import DifficultyMeter from "./DifficultyMeter"

export default function DifficultyRatingInput({
  startValueInQuarters,
  onChange,
}: {
  startValueInQuarters: number | null
  onChange(newValueInQuarters: number): void
}) {
  const [valueInQuarters, setValueInQuarters] = useState(startValueInQuarters)

  function callChangeHandlerAndUpdate(newValueInQuarters: number) {
    onChange(newValueInQuarters)
    setValueInQuarters(newValueInQuarters)
  }

  return (
    <div>
      <DifficultyMeter
        valueInQuarters={valueInQuarters ?? 0}
        onChange={callChangeHandlerAndUpdate}
      />
    </div>
  )
}
