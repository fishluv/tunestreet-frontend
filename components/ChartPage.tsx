import Image from "next/image"
import Link from "next/link"
import { Database } from "popn-db-js"
import DiffLevelPill from "./DiffLevelPill"
import EntityRatings from "./EntityRatings"
import SongLink from "./SongLink"

export default function ChartPage(chartId: string) {
  const [chart] = Database.findCharts(chartId)
  if (chart === null) {
    return <p>Couldnt find chart {chartId}</p>
  }

  const { title, difficulty, level, songId } = chart
  const paddedId = `000${songId}`.slice(-4)
  const bannerUrl = `https://popn-assets.surge.sh/kc_${paddedId}.png`

  return (
    <>
      <p>
        <SongLink songId={songId}>&lt;&lt; Song page</SongLink>
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
      <EntityRatings entityType="chart" entityId={chartId} />
    </>
  )
}
