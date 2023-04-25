import VersionPage from "@/components/VersionPage"
import { useRouter } from "next/router"

export default function VersionPageHandler() {
  const router = useRouter()
  const { version } = router.query

  return VersionPage(String(version))
}
