import Link from "next/link"
import { Difficulty } from "popn-db-js"
import { ReactNode } from "react"

export default function ChartLink({
  songSlug,
  difficulty,
  children,
}: {
  songSlug: string
  difficulty: Difficulty
  children: ReactNode
}) {
  return <Link href={`/s/${songSlug}/${difficulty}`}>{children}</Link>
}
