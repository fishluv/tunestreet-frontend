import ChartPage from "@/components/ChartPage"
import { useRouter } from "next/router"

export default function ChartHyperPage() {
  const router = useRouter()
  const { songId } = router.query
  const chartId = `${songId}h`

  return ChartPage(chartId)
}
