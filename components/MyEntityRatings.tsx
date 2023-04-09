import StarBar from "@/components/StarBar"
import { useState } from "react"
import styles from "@/components/StarBar.module.scss"
import Link from "next/link"
import { saveMyEntityRating, useMyEntityRatings } from "@/lib/fetch"
import { EntityOptions } from "./EntityOptions"

function MyEntityRatings({ entityType, entityId }: EntityOptions) {
  const { data, error } = useMyEntityRatings({ entityType, entityId })

  if (error?.status === 401) {
    return (
      <div>
        <Link href="/login">Log in</Link> to rate this {entityType}
      </div>
    )
  }

  if (error?.data) return <div>Error loading your ratings {error.data}</div>
  if (!data) return <div>Loading...</div>

  const { user_entity_ratings } = data
  if (!user_entity_ratings) {
    return <div>Couldnt find your ratings data</div>
  }

  const { quality_rating, difficulty_rating } = user_entity_ratings

  const qualityFloat = parseFloat(quality_rating)
  const qualityInHalves = isNaN(qualityFloat)
    ? null
    : Math.floor(qualityFloat / 0.5)

  function onQualityRatingChange(newValueInHalves: number) {
    saveMyEntityRating({
      entityType,
      entityId,
      type: "quality",
      value: String(newValueInHalves * 0.5),
    })
  }

  return (
    <div>
      <h2>My ratings:</h2>
      <h3>
        Quality:{" "}
        {qualityInHalves === null ? "n/a" : (qualityInHalves * 0.5).toFixed(1)}
      </h3>
      <h3>Difficulty: {difficulty_rating ?? "n/a"}</h3>
      <QualityRatingInput
        startValueInHalves={qualityInHalves}
        onRatingChange={onQualityRatingChange}
      />
    </div>
  )
}

function QualityRatingInput({
  startValueInHalves,
  onRatingChange,
}: {
  startValueInHalves: number | null
  onRatingChange(newValueInHalves: number): void
}) {
  const [valueInHalves, setValueInHalves] = useState(startValueInHalves)

  function onStarBarValueChange(newValueInHalves: number) {
    onRatingChange(newValueInHalves)
    setValueInHalves(newValueInHalves)
  }

  return (
    <div className={styles.QualityRater}>
      <StarBar
        startValueInHalves={valueInHalves ?? 0}
        onValueChange={onStarBarValueChange}
      />
      <span className={styles.value}>
        {((valueInHalves ?? 0) * 0.5).toFixed(1)}
      </span>
    </div>
  )
}

export default MyEntityRatings