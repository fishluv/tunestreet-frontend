import ChartPage from "@/components/ChartPage"
import SongPage from "@/components/SongPage"
import { decodeSongHashId } from "@/lib/hashids"
import { useRouter } from "next/router"
import { Difficulty } from "popn-db-js"

export function makeChartPageHandler(difficulty: Difficulty) {
  return function () {
    const router = useRouter()
    const { songHashId } = router.query
    const songId = decodeSongHashId(songHashId as string)
    const chartId = `${songId}${difficulty}`

    return ChartPage(chartId)
  }
}

export default function SongPageHandler() {
  const router = useRouter()
  const { songHashId } = router.query
  console.dir(`songhashid = ${songHashId}`)
  const songId = decodeSongHashId(songHashId as string)
  console.dir(`songid = ${songId}`)

  return SongPage(String(songId))
}
