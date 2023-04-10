import { useSiteEntityRatings } from "@/lib/fetch"
import { EntityOptions } from "./EntityOptions"

export default function SiteEntityRatings({
  entityType,
  entityId,
}: EntityOptions) {
  const { data, error, isLoading } = useSiteEntityRatings({
    entityType,
    entityId,
  })

  if (error) {
    console.error(`Error loading site ratings: ${JSON.stringify(error.data)}`)
    return <div>Error loading site ratings</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  const { site_entity_ratings } = data
  if (!site_entity_ratings) {
    return <div>Couldnt find site ratings data</div>
  }

  const { quality_rating, difficulty_rating } = site_entity_ratings

  return (
    <div>
      <h2>Site ratings:</h2>
      <h3>Quality: {quality_rating ?? "n/a"}</h3>
      {entityType === "chart" && (
        <h3>Difficulty: {difficulty_rating ?? "n/a"}</h3>
      )}
    </div>
  )
}
