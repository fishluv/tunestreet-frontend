import FolderPill from "@/components/FolderPill"
import { VERSION_FOLDERS } from "popn-db-js"

export default function AllVersionsPageHandler() {
  return (
    <div>
      {VERSION_FOLDERS.map((version) => (
        <p key={version}>
          <FolderPill songFolder={version} style="normal" isLink={true} />
        </p>
      ))}
    </div>
  )
}
