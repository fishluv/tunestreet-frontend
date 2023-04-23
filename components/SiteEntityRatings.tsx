import { getDifficultyRatingDisplayString } from "@/lib/difficulty"
import { useFetchSiteEntityRatings } from "@/lib/fetch"
import { EntityOptions } from "./EntityOptions"

export default function SiteEntityRatings({
  entityType,
  entityId,
}: EntityOptions) {
  const { data, error, isLoading } = useFetchSiteEntityRatings({
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

  const {
    quality_rating,
    quality_rating_count,
    difficulty_rating,
    difficulty_rating_count,
  } = site_entity_ratings

  return (
    <div>
      <h3>
        Site rating:{" "}
        {quality_rating && quality_rating_count
          ? `${quality_rating} / 5.0 from ${quality_rating_count} ratings`
          : "No ratings"}
      </h3>
      {entityType === "chart" && (
        <h3>
          Site difficulty rating:{" "}
          {difficulty_rating && difficulty_rating_count
            ? `${getDifficultyRatingDisplayString(
                difficulty_rating,
              )} from ${difficulty_rating_count} ratings`
            : "No ratings"}
        </h3>
      )}
    </div>
  )
}
