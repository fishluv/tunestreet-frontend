import Link from "next/link"
import { ReactNode } from "react"

export default function SongLink({
  songSlug,
  children,
}: {
  songSlug: string
  children: ReactNode
}) {
  return <Link href={`/s/${songSlug}`}>{children}</Link>
}
