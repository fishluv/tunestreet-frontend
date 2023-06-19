import ChartPage from "@/components/ChartPage"
import SongPage from "@/components/SongPage"
import { useRouter } from "next/router"
import { Difficulty } from "popn-db-js"

export function makeChartPageHandler(difficulty: Difficulty) {
  return function () {
    const router = useRouter()
    const { songSlug } = router.query

    return ChartPage(String(songSlug), difficulty)
  }
}

export default function SongPageHandler() {
  const router = useRouter()
  const { songSlug } = router.query

  return SongPage(String(songSlug))
}
