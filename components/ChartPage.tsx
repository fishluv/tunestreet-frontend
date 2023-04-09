import Image from "next/image"
import Link from "next/link"
import { Database } from "popn-db-js"
import EntityRatings from "./EntityRatings"

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
        <Link href={`/s/${chart.songId}`}>&lt;&lt; Back to song page</Link>
      </p>
      <Image
        src={bannerUrl}
        alt={`banner for ${title}`}
        width={160}
        height={44}
      />
      <h1>{title}</h1>
      <h2>
        {difficulty} {level}
      </h2>
      <EntityRatings entityType="chart" entityId={chartId} />
    </>
  )
}
