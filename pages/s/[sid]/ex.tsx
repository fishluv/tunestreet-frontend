import Image from "next/image"
import { useRouter } from "next/router"
import { Database, Chart } from "popn-db-js"

const ChartPageHandler = () => {
  const router = useRouter()
  const { sid } = router.query
  const [chart] = Database.findCharts(`${sid}ex`)

  if (chart === null) {
    return <p>Couldnt find {sid} ex</p>
  } else {
    return ChartPage(chart)
  }
}

const ChartPage = (chart: Chart) => {
  const { title, difficulty, level, songId } = chart
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
      <h2>
        {difficulty} {level}
      </h2>
    </>
  )
}

export default ChartPageHandler
