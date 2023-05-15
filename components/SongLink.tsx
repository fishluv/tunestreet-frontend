import { encodeSongId } from "@/lib/hashids"
import Link from "next/link"
import { ReactNode } from "react"

export default function SongLink({
  songId,
  children,
}: {
  songId: string
  children: ReactNode
}) {
  const songHashId = encodeSongId(songId)
  return <Link href={`/s/${songHashId}`}>{children}</Link>
}
