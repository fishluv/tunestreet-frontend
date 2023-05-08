import Link from "next/link"
import { useRouter } from "next/router"
import { LEVELS } from "popn-db-js"

export default function AllVersionsPageHandler() {
  const { asPath } = useRouter()

  return (
    <div>
      {LEVELS.map((level) => (
        <p key={level}>
          <Link href={`${asPath}/${level}`}>{level}</Link>
        </p>
      ))}
    </div>
  )
}
