import FolderPill from "@/components/FolderPill"
import Link from "next/link"
import { useRouter } from "next/router"
import { VERSION_FOLDERS } from "popn-db-js"

export default function AllVersionsPageHandler() {
  const { asPath } = useRouter()

  return (
    <div>
      {VERSION_FOLDERS.map((version) => (
        <p key={version}>
          <Link href={`${asPath}/${version}`}>
            <FolderPill songFolder={version} style="normal" />
          </Link>
        </p>
      ))}
    </div>
  )
}
