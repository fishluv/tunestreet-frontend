import SongPage from "@/components/SongPage"
import { useRouter } from "next/router"

export default function SongPageHandler() {
  const router = useRouter()
  const { songId } = router.query

  return SongPage(String(songId))
}
