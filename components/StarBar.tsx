import { MouseEvent } from "react"
import starSprite from "@/assets/star_sprite.png" // Stolen from Rate Your Music.

export default function StarBar({
  sizeMultiplier,
  valueInHalves,
  onChange,
}: {
  sizeMultiplier: number
  valueInHalves: number | null
  onChange(newValueInHalves: number): void
}) {
  const widthPx = 90 * sizeMultiplier
  const heightPx = 16 * sizeMultiplier
  const spriteDistancePx = 66 * sizeMultiplier

  let spriteIndex
  if (valueInHalves === null) {
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

  function onClick(e: MouseEvent<HTMLDivElement>) {
    const x = e.nativeEvent.offsetX
    const xInHalves = Math.ceil((x / widthPx) * 10)
    onChange(xInHalves)
  }

  return <div style={styleObj} onClick={onClick}></div>
}
