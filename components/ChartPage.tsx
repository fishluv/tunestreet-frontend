import Image from "next/image"
import Link from "next/link"
import { Difficulty, Unilab } from "popn-db-js"
import DiffLevelPill from "./DiffLevelPill"
import EntityRatings from "./EntityRatings"
import SongLink from "./SongLink"

export default function ChartPage(songSlug: string, difficulty: Difficulty) {
  const chart = Unilab.findChartBySongSlug(songSlug, difficulty)
  if (chart === null) {
    return <p>Couldnt find chart</p>
  }

  const { title, level, songId, id } = chart
  const paddedId = `000${songId}`.slice(-4)
  const bannerUrl = `https://popn-assets.surge.sh/kc_${paddedId}.png`

  return (
    <>
      <p>
        <SongLink songSlug={songSlug}>&lt;&lt; Song page</SongLink>
      </p>
      <p>
        <Link href={`/lv/${level}`}>&lt;&lt; All {level}s</Link>
      </p>
      <Image
        src={bannerUrl}
        alt={`banner for ${title}`}
        width={160}
        height={44}
      />
      <h1>{title}</h1>
      <h2>
        <DiffLevelPill difficulty={difficulty} level={level} />{" "}
      </h2>
      <EntityRatings entityType="chart" entityId={id} />
    </>
  )
}
