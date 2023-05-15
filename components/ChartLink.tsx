import { encodeSongId } from "@/lib/hashids"
import Link from "next/link"
import { Difficulty } from "popn-db-js"
import { ReactNode } from "react"

export default function ChartLink({
  songId,
  difficulty,
  children,
}: {
  songId: string
  difficulty: Difficulty
  children: ReactNode
}) {
  const songHashId = encodeSongId(songId)
  return <Link href={`/s/${songHashId}/${difficulty}`}>{children}</Link>
}
