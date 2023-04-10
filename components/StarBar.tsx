import { ReactNode, useState } from "react"
import clsx from "clsx"
import styles from "./StarBar.module.scss"
import starSprite from "@/assets/star_sprite.png" // Stolen from Rate Your Music.

function StarImageBar({
  sizeMultiplier,
  valueInHalves,
  setValueInHalves,
}: {
  sizeMultiplier: number
  valueInHalves: number
  setValueInHalves(valueInHalves: number): void
}) {
  const widthPx = 90 * sizeMultiplier
  const heightPx = 16 * sizeMultiplier
  const spriteDistancePx = 66 * sizeMultiplier

  let spriteIndex
  if (valueInHalves === 0) {
    spriteIndex = 0
  } else if (valueInHalves === 10) {
    spriteIndex = 1
  } else {
    spriteIndex = valueInHalves + 1
  }
  const bgPosYPx = spriteIndex * spriteDistancePx * -1

  const styleObj = {
    width: `${widthPx}px`,
    height: `${heightPx}px`,
    backgroundImage: `url(${starSprite.src})`,
    backgroundPositionX: "left",
    backgroundPositionY: `${bgPosYPx}px`,
    backgroundSize: "cover",
  }
  return <div style={styleObj}></div>
}

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

  return (
    <span>
      {prepareStars()}
      <StarImageBar
        sizeMultiplier={1.5}
        valueInHalves={valueInHalves}
        setValueInHalves={setValueInHalves}
      />
    </span>
  )
}
