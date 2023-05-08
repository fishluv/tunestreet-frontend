import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Database } from "popn-db-js"
import DiffLevelPill from "./DiffLevelPill"
import EntityRatings from "./EntityRatings"
import styles from "./SongPage.module.scss"
import FolderPill from "./FolderPill"

export default function SongPage(songId: string) {
  const { asPath } = useRouter()
  const [easyChart, normalChart, hyperChart, exChart] = Database.findCharts(
    `${songId}e`,
    `${songId}n`,
    `${songId}h`,
    `${songId}ex`,
  )
  if (normalChart === null) {
    return <p>Couldnt find song {songId}</p>
  }

  const { title, songFolder } = normalChart
  const paddedId = `000${songId}`.slice(-4)
  const bannerUrl = `https://popn-assets.surge.sh/kc_${paddedId}.png`

  return (
    <>
      <p>
        <Link href={`/v/${String(parseInt(songFolder))}`}>
          &lt;&lt; All from{" "}
          <FolderPill songFolder={normalChart.songFolder} style="normal" />
        </Link>
      </p>
      <Image
        src={bannerUrl}
        alt={`banner for ${title}`}
        width={160}
        height={44}
      />
      <FolderPill songFolder={normalChart.songFolder} style="normal" />
      <h1>{title}</h1>
      <EntityRatings entityType="song" entityId={songId} />
      <h2>Charts</h2>
      <p>
        {easyChart && (
          <Link href={`${asPath}/e`} className={styles.chartLink}>
            <DiffLevelPill difficulty="e" level={easyChart.level} />
          </Link>
        )}
        {normalChart && (
          <Link href={`${asPath}/n`} className={styles.chartLink}>
            <DiffLevelPill difficulty="n" level={normalChart.level} />
          </Link>
        )}
        {hyperChart && (
          <Link href={`${asPath}/h`} className={styles.chartLink}>
            <DiffLevelPill difficulty="h" level={hyperChart.level} />
          </Link>
        )}
        {exChart && (
          <Link href={`${asPath}/ex`} className={styles.chartLink}>
            <DiffLevelPill difficulty="ex" level={exChart.level} />
          </Link>
        )}
      </p>
    </>
  )
}
