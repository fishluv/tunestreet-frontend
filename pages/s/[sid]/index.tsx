import Image from "next/image"
import { useRouter } from "next/router"
import { Database, Chart } from "popn-db-js"

const SongPageHandler = () => {
  const router = useRouter()
  const { sid } = router.query
  const [normalChart] = Database.findCharts(`${sid}n`)

  if (normalChart === null) {
    return <p>Couldnt find {sid}</p>
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
