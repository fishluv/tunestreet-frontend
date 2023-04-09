import useSWR from "swr"
import Image from "next/image"
import { useRouter } from "next/router"
import { Database, Chart } from "popn-db-js"
import StarBar from "@/components/StarBar"
import { useState } from "react"
import styles from "@/components/StarBar.module.scss"
import getBackendUrl from "@/getBackendUrl"

const urlFetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json())

function SiteRatings() {
  const router = useRouter()
  const { sid } = router.query
  const url = getBackendUrl(
    "/ratings/site",
    `?entity_type=chart&entity_id=${sid}ex`,
  )
  const { data, error } = useSWR(url, urlFetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const { site_entity_ratings, errors } = data
  if (!site_entity_ratings) {
    return <div>Failed to load {errors ?? errors}</div>
  }

  const { quality_rating, difficulty_rating } = site_entity_ratings

  return (
    <div>
      <h2>Site ratings:</h2>
      <h3>Quality: {quality_rating ?? "n/a"}</h3>
      <h3>Difficulty: {difficulty_rating ?? "n/a"}</h3>
    </div>
  )
}

function MyRatings() {
  const router = useRouter()
  const { sid } = router.query
  const url = getBackendUrl(
    "/ratings/mine",
    `?entity_type=chart&entity_id=${sid}ex`,
  )
  const { data, error } = useSWR(url, urlFetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const { user_entity_ratings, errors } = data
  if (!user_entity_ratings) {
    return <div>Failed to load {errors ?? errors}</div>
  }

  const { quality_rating, difficulty_rating } = user_entity_ratings

  return (
    <div>
      <h2>My ratings:</h2>
      <h3>Quality: {quality_rating ?? "n/a"}</h3>
      <h3>Difficulty: {difficulty_rating ?? "n/a"}</h3>
    </div>
  )
}

function QualityRater() {
  const [valueInHalves, setValueInHalves] = useState(0)

  return (
    <div className={styles.QualityRater}>
      <StarBar
        startValueInHalves={0}
        onValueChange={(newValueInHalves) => setValueInHalves(newValueInHalves)}
      />
      <span className={styles.value}>{valueInHalves / 2}</span>
    </div>
  )
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
      <SiteRatings />
      <MyRatings />
      <QualityRater />
    </>
  )
}

export default function ChartExPage() {
  const router = useRouter()
  const { sid } = router.query
  const [chart] = Database.findCharts(`${sid}ex`)

  if (chart === null) {
    return <p>Couldnt find {sid} ex</p>
  } else {
    return ChartPage(chart)
  }
}
