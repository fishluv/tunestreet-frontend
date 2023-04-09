import Image from "next/image"
import { Database } from "popn-db-js"

export default function SongPage(songId: string) {
  const [normalChart] = Database.findCharts(`${songId}n`)
  if (normalChart === null) {
    return <p>Couldnt find song {songId}</p>
  }

  const { title } = normalChart
  const paddedId = `000${songId}`.slice(-4)
  const bannerUrl = `https://popn-assets.surge.sh/kc_${paddedId}.png`

  return (
    <>
      <Image
        src={bannerUrl}
        alt={`banner for ${title}`}
        width={160}
        height={44}
      />
      <h1>{title}</h1>
    </>
  )
}
