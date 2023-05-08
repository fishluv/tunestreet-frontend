import Image from "next/image"
import Link from "next/link"
import { Database } from "popn-db-js"
import DiffLevelPill from "./DiffLevelPill"
import { sortBy } from "lodash"

export default function LevelPage({ level }: { level: number }) {
  const charts = Database.queryCharts(`lv=${level}`)
  const sortedByTitle = sortBy(charts, (c) => c.title)

  return (
    <>
      <p>
        <Link href="/lv">&lt;&lt; All levels</Link>
      </p>
      <h2>Level {level}</h2>
      <table>
        <tbody>
          {sortedByTitle.map((chart) => {
            const { songId, title, genre, difficulty, level } = chart
            const paddedId = `000${songId}`.slice(-4)
            const bannerUrl = `https://popn-assets.surge.sh/kc_${paddedId}.png`
            return (
              <tr key={songId}>
                <td>
                  <Link href={`/s/${songId}/${difficulty}`}>
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
                  <Link href={`/s/${songId}/${difficulty}`}>
                    <DiffLevelPill difficulty={difficulty} level={level} />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}