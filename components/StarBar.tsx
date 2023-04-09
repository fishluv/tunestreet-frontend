import { ReactNode, useState } from "react"
import clsx from "clsx"
import styles from "./StarBar.module.scss"

function StarHalf({
  side,
  isFilled,
  onClick,
}: {
  side: "left" | "right"
  isFilled: boolean
  onClick(): void
}) {
  const className = clsx(
    styles.StarHalf,
    styles[side],
    isFilled && styles.filled,
  )

  return <span className={className} onClick={onClick}></span>
}

export default function StarBar({
  startValueInHalves,
  onValueChange,
}: {
  startValueInHalves: number
  onValueChange(newValueInHalves: number): void
}) {
  const [valueInHalves, setValueInHalves] = useState<number>(startValueInHalves)

  function prepareStars(): ReactNode {
    const stars = []

    for (let i = 1; i <= 10; i++) {
      const side = i % 2 == 1 ? "left" : "right"
      const isFilled = i <= valueInHalves
      const onClick = () => {
        setValueInHalves(i)
        onValueChange(i)
      }

      stars.push(
        <StarHalf side={side} isFilled={isFilled} onClick={onClick} key={i} />,
      )
    }

    return stars
  }

  return <span>{prepareStars()}</span>
}
