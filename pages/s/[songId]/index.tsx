import Image from "next/image"
import { useRouter } from "next/router"
import { Database, Chart } from "popn-db-js"

const SongPageHandler = () => {
  const router = useRouter()
  const { songId } = router.query
  const [normalChart] = Database.findCharts(`${songId}n`)

  if (normalChart === null) {
    return <p>Couldnt find {songId}</p>
  } else {
    return SongPage(normalChart)
  }
}

const SongPage = (normalChart: Chart) => {
  const { title, songId } = normalChart
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

export default SongPageHandler
