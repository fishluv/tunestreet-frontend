import ChartPage from "@/components/ChartPage"
import { useRouter } from "next/router"

export default function ChartNormalPage() {
  const router = useRouter()
  const { songId } = router.query
  const chartId = `${songId}n`

  return ChartPage(chartId)
}
