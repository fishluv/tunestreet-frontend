import StarBar from "@/components/StarBar"
import { useState } from "react"
import styles from "@/components/StarBar.module.scss"
import Link from "next/link"
import { saveMyEntityRating, useFetchMyEntityRatings } from "@/lib/fetch"
import { EntityOptions } from "./EntityOptions"
import { mutate as mutateGlobal } from "swr"
import { getSiteEntityRatingsUrl } from "@/lib/backendUrls"

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

  return (
    <div>
      <h2>My ratings:</h2>
      <h3>
        Quality:{" "}
        {qualityInHalves === null ? "n/a" : (qualityInHalves * 0.5).toFixed(1)}
      </h3>
      {entityType === "chart" && (
        <h3>Difficulty: {difficulty_rating ?? "n/a"}</h3>
      )}
      <QualityRatingInput
        startValueInHalves={qualityInHalves}
        onChange={saveQualityRatingAndSync}
      />
    </div>
  )
}

function QualityRatingInput({
  startValueInHalves,
  onChange,
}: {
  startValueInHalves: number | null
  onChange(newValueInHalves: number): void
}) {
  const [valueInHalves, setValueInHalves] = useState(startValueInHalves)

  function callChangeHandlerAndUpdate(newValueInHalves: number) {
    onChange(newValueInHalves)
    setValueInHalves(newValueInHalves)
  }

  return (
    <div className={styles.QualityRater}>
      <StarBar
        sizeMultiplier={2}
        valueInHalves={valueInHalves ?? 0}
        onChange={callChangeHandlerAndUpdate}
      />
    </div>
  )
}

export default MyEntityRatings
