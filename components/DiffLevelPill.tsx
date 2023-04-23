import clsx from "clsx"
import { M_PLUS_1 } from "next/font/google"
import styles from "./DiffLevelPill.module.scss"

const mplus1 = M_PLUS_1({
  weight: ["700"],
  subsets: ["latin"],
})

export default function DiffLevelPill({
  difficulty,
  level,
}: {
  difficulty: "e" | "n" | "h" | "ex"
  level: number
}) {
  const className = clsx(
    mplus1.className,
    styles.DiffLevelPill,
    styles[difficulty],
  )
  return (
    <span className={className}>
      {difficulty} {level}
    </span>
  )
}
