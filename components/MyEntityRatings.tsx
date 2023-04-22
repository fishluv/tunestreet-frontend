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

  function difficultyToDescription(difficultyFloat: number) {
    switch (difficultyFloat) {
      case -1.25:
        return "Should be the next level down"
      case -1:
        return "Among the easiest"
      case -0.75:
        return "Very easy"
      case -0.5:
        return "Moderately easy"
      case -0.25:
        return "Slightly easy"
      case 0:
        return "Right in the middle"
      case 0.25:
        return "Slightly hard"
      case 0.5:
        return "Moderately hard"
      case 0.75:
        return "Very hard"
      case 1:
        return "Among the hardest"
      case 1.25:
        return "Should be the next level up"
      default:
        return "n/a"
    }
  }

  return (
    <div>
      <h2>My ratings:</h2>
      <h3>
        Quality:{" "}
        {qualityInHalves === null ? "n/a" : (qualityInHalves * 0.5).toFixed(1)}
      </h3>
      {entityType === "chart" && (
        <h3>Difficulty: {difficultyToDescription(difficultyFloat)}</h3>
      )}
      <QualityRatingInput
        startValueInHalves={qualityInHalves}
        onChange={saveQualityRatingAndSync}
      />
      <DifficultyRatingInput
        startValueInQuarters={difficultyInQuarters}
        onChange={saveDifficultyRatingAndSync}
      />
    </div>
  )
}

export default MyEntityRatings
