import { useSiteEntityRatings } from "@/lib/fetch"
import { EntityOptions } from "./EntityOptions"

export default function SiteEntityRatings({
  entityType,
  entityId,
}: EntityOptions) {
  const { data, error } = useSiteEntityRatings({ entityType, entityId })

  if (error?.data) return <div>Error loading site ratings {error.data}</div>
  if (!data) return <div>Loading...</div>

  const { site_entity_ratings } = data
  if (!site_entity_ratings) {
    return <div>Couldnt find site ratings data</div>
  }

  const { quality_rating, difficulty_rating } = site_entity_ratings

  return (
    <div>
      <h2>Site ratings:</h2>
      <h3>Quality: {quality_rating ?? "n/a"}</h3>
      <h3>Difficulty: {difficulty_rating ?? "n/a"}</h3>
    </div>
  )
}
