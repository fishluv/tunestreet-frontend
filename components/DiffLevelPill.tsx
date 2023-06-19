import clsx from "clsx"
import styles from "./DiffLevelPill.module.scss"
import { pillFont } from "./fonts"

export default function DiffLevelPill({
  difficulty,
  level,
}: {
  difficulty: "e" | "n" | "h" | "ex"
  level: number
}) {
  const className = clsx(
    pillFont.className,
    styles.DiffLevelPill,
    styles[difficulty],
  )
  return (
    <span className={className}>
      {difficulty} {level}
    </span>
  )
}
