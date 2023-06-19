import Image from "next/image"
import Link from "next/link"
import { Unilab, parseVersionFolder } from "popn-db-js"
import DiffLevelPill from "./DiffLevelPill"
import { groupBy, sortBy } from "lodash"
import SongLink from "./SongLink"
import ChartLink from "./ChartLink"

export default function VersionPage({
  unpaddedVersion,
}: {
  unpaddedVersion: string
}) {
  let paddedVersion
  try {
    paddedVersion = parseVersionFolder(unpaddedVersion)
  } catch {
    return <p>Couldnt find version {unpaddedVersion}</p>
  }

  // flat
  const charts = Unilab.queryCharts(`ver=${paddedVersion}`)
  // group by song
  const bySongId = Object.entries(groupBy(charts, (c) => c.songId))
  // sort by title
  const sortedByTitle = sortBy(bySongId, ([_songId, charts]) => charts[0].title)

  return (
    <>
      <p>
        <Link href="/v">&lt;&lt; All versions</Link>
      </p>
      <table>
        <thead>
          <tr>
            <th>song</th>
            <th>easy</th>
            <th>normal</th>
            <th>hyper</th>
            <th>ex</th>
          </tr>
        </thead>
        <tbody>
          {sortedByTitle.map(([_, charts]) => {
            const byDiff = groupBy(charts, (c) => c.difficulty)
            const easy = byDiff.e?.[0]
            const normal = byDiff.n?.[0]
            const hyper = byDiff.h?.[0]
            const ex = byDiff.ex?.[0]
            const { songId, songSlug, title, genre } = charts[0]
            const paddedId = `000${songId}`.slice(-4)
            const bannerUrl = `https://popn-assets.surge.sh/kc_${paddedId}.png`
            return (
              <tr key={songId}>
                <td>
                  <SongLink songSlug={songSlug}>
                    <Image
                      src={bannerUrl}
                      alt={`banner for ${title}`}
                      width={160}
                      height={44}
                    />
                    {title}
                    {genre !== title && ` / ${genre}`}
                  </SongLink>
                </td>
                <td>
                  {easy && (
                    <ChartLink songSlug={songSlug} difficulty="e">
                      <DiffLevelPill difficulty="e" level={easy.level} />
                    </ChartLink>
                  )}
                </td>
                <td>
                  {normal && (
                    <ChartLink songSlug={songSlug} difficulty="n">
                      <DiffLevelPill difficulty="n" level={normal.level} />
                    </ChartLink>
                  )}
                </td>
                <td>
                  {hyper && (
                    <ChartLink songSlug={songSlug} difficulty="h">
                      <DiffLevelPill difficulty="h" level={hyper.level} />
                    </ChartLink>
                  )}
                </td>
                <td>
                  {ex && (
                    <ChartLink songSlug={songSlug} difficulty="ex">
                      <DiffLevelPill difficulty="ex" level={ex.level} />
                    </ChartLink>
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
