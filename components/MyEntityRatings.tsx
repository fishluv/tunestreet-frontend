import Link from "next/link"
import { saveMyEntityRating, useFetchMyEntityRatings } from "@/lib/fetch"
import { EntityOptions } from "./EntityOptions"
import { mutate as mutateGlobal } from "swr"
import { getSiteEntityRatingsUrl } from "@/lib/backendUrls"
import QualityRatingInput from "./QualityRatingInput"
import DifficultyRatingInput from "./DifficultyRatingInput"

function MyEntityRatings({ entityType, entityId }: EntityOptions) {
  const { data, error, isLoading, mutate } = useFetchMyEntityRatings({
    entityType,
    entityId,
  })

  if (error?.status === 401) {
    return (
      <div>
        <Link href="/login">Log in</Link> to rate this {entityType}
      </div>
    )
  }

  if (error) {
    console.error(`Error loading your ratings: ${JSON.stringify(error.data)}`)
    return <div>Error loading your ratings</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  const { user_entity_ratings } = data
  if (!user_entity_ratings) {
    return <div>Couldnt find your ratings data</div>
  }

  const { quality_rating, difficulty_rating } = user_entity_ratings

  const qualityFloat = parseFloat(quality_rating)
  const qualityInHalves = isNaN(qualityFloat)
    ? null
    : Math.floor(qualityFloat / 0.5)

  async function saveQualityRatingAndSync(newValueInHalves: number) {
    await saveMyEntityRating({
      entityType,
      entityId,
      type: "quality",
      value: String(newValueInHalves * 0.5),
    })
    mutate()
    mutateGlobal(getSiteEntityRatingsUrl({ entityType, entityId }))
  }

  const difficultyFloat = parseFloat(difficulty_rating)
  const difficultyInQuarters = isNaN(difficultyFloat)
    ? null
    : Math.floor(difficultyFloat / 0.25)

  async function saveDifficultyRatingAndSync(newValueInQuarters: number) {
    await saveMyEntityRating({
      entityType,
      entityId,
      type: "difficulty",
      value: String(newValueInQuarters * 0.25),
    })
    mutate()
    mutateGlobal(getSiteEntityRatingsUrl({ entityType, entityId }))
  }

  function getDifficultyLabel(difficultyInQuarters: number | null) {
    switch (difficultyInQuarters) {
      case null:
        return "Unrated"
      case -5:
        return "Overleveled"
      case -4:
        return "Bottom"
      case -3:
        return "Very low"
      case -2:
        return "Low"
      case -1:
        return "Mid low"
      case 0:
        return "Mid"
      case 1:
        return "Mid high"
      case 2:
        return "High"
      case 3:
        return "Very high"
      case 4:
        return "Top"
      case 5:
        return "Underleveled"
      default:
        return ""
    }
  }

  return (
    <div>
      <h2>My ratings:</h2>
      <QualityRatingInput
        startValueInHalves={qualityInHalves}
        onChange={saveQualityRatingAndSync}
      />
      <DifficultyRatingInput
        startValueInQuarters={difficultyInQuarters}
        onChange={saveDifficultyRatingAndSync}
      />
      <span>{getDifficultyLabel(difficultyInQuarters)}</span>
    </div>
  )
}

export default MyEntityRatings
