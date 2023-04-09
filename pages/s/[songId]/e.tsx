import ChartPage from "@/components/ChartPage"
import { useRouter } from "next/router"

export default function ChartExPage() {
  const router = useRouter()
  const { songId } = router.query
  const chartId = `${songId}e`

  return ChartPage(chartId)
}
