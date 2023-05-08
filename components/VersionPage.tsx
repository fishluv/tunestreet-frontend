import Image from "next/image"
import Link from "next/link"
import { Database, parseVersionFolder } from "popn-db-js"
import DiffLevelPill from "./DiffLevelPill"
import { groupBy, sortBy } from "lodash"

export default function VersionPage(version: string) {
  let parsedVersion
  try {
    parsedVersion = parseVersionFolder(version)
  } catch {
    return <p>Couldnt find version {version}</p>
  }
  // flat
  const charts = Database.queryCharts(`ver=${parsedVersion}`)
  // group by song
  const bySongId = Object.entries(groupBy(charts, (c) => c.songId))
  // sort by title
  const sortedByTitle = sortBy(bySongId, ([_songId, charts]) => charts[0].title)

  return (
    <>
      <p>
        <Link href="/v">&lt;&lt; Back to all versions</Link>
      </p>
      <table>
        <thead>
          <th>song</th>
          <th>easy</th>
          <th>normal</th>
          <th>hyper</th>
          <th>ex</th>
        </thead>
        <tbody>
          {sortedByTitle.map(([_, charts]) => {
            const byDiff = groupBy(charts, (c) => c.difficulty)
            const easy = byDiff.e?.[0]
            const normal = byDiff.n?.[0]
            const hyper = byDiff.h?.[0]
            const ex = byDiff.ex?.[0]
            const { songId, title, genre } = charts[0]
            const paddedId = `000${songId}`.slice(-4)
            const bannerUrl = `https://popn-assets.surge.sh/kc_${paddedId}.png`
            return (
              <tr key={songId}>
                <td>
                  <Link href={`/s/${songId}`}>
                    <Image
                      src={bannerUrl}
                      alt={`banner for ${title}`}
                      width={160}
                      height={44}
                    />
                    {title}
                    {genre !== title && ` / ${genre}`}
                  </Link>
                </td>
                <td>
                  {easy && (
                    <Link href={`/s/${songId}/e`}>
                      <DiffLevelPill difficulty="e" level={easy.level} />
                    </Link>
                  )}
                </td>
                <td>
                  {normal && (
                    <Link href={`/s/${songId}/n`}>
                      <DiffLevelPill difficulty="n" level={normal.level} />
                    </Link>
                  )}
                </td>
                <td>
                  {hyper && (
                    <Link href={`/s/${songId}/h`}>
                      <DiffLevelPill difficulty="h" level={hyper.level} />
                    </Link>
                  )}
                </td>
                <td>
                  {ex && (
                    <Link href={`/s/${songId}/ex`}>
                      <DiffLevelPill difficulty="ex" level={ex.level} />
                    </Link>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
