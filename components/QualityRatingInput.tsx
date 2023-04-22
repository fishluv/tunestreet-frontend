import QualityMeter from "@/components/QualityMeter"
import { useState } from "react"
import styles from "@/components/StarBar.module.scss"

export default function QualityRatingInput({
  startValueInHalves,
  onChange,
}: {
  startValueInHalves: number | null
  onChange(newValueInHalves: number): void
}) {
  const [valueInHalves, setValueInHalves] = useState(startValueInHalves)

  function callChangeHandlerAndUpdate(newValueInHalves: number) {
    onChange(newValueInHalves)
    setValueInHalves(newValueInHalves)
  }

  return (
    <div className={styles.QualityRater}>
      <QualityMeter
        sizeMultiplier={2}
        valueInHalves={valueInHalves}
        onChange={callChangeHandlerAndUpdate}
      />
    </div>
  )
}
