import useSWR from "swr"
import Image from "next/image"
import { useRouter } from "next/router"
import { Database, Chart } from "popn-db-js"

const urlFetcher = (url: string) => fetch(url).then((res) => res.json())

function MyRating() {
  const router = useRouter()
  const { sid } = router.query
  const url =
    "https://backend.tunestreet.org/rating?" +
    new URLSearchParams({
      type: "quality",
      entity_type: "chart",
      entity_id: `${sid}ex`,
    })
  const { data, error } = useSWR(url, urlFetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const value = data.rating?.value

  return <h2>Rating: {value ?? "none"}</h2>
}

function ChartPageHandler() {
  const router = useRouter()
  const { sid } = router.query
  const [chart] = Database.findCharts(`${sid}ex`)

  if (chart === null) {
    return <p>Couldnt find {sid} ex</p>
  } else {
    return ChartPage(chart)
  }
}

function ChartPage(chart: Chart) {
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
      <MyRating />
    </>
  )
}

export default ChartPageHandler
