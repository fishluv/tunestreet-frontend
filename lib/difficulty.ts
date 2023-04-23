export function getDifficultyRatingDisplayString(
  difficulty: any,
  fallback: string = "Unrated",
): string {
  const diffFloat = parseFloat(difficulty)
  if (isNaN(diffFloat)) {
    return fallback
  }

  /**
   * (-inf, -1.0) Overleveled
   * [-1.0, -0.8] Bottom
   * (-0.8, -0.3] Low
   * (-0.3, +0.3) Mid
   * [+0.3, +0.8) High
   * [+0.8, +1.0] Top
   * (+1.0, +inf) Underleveled
   */
  let diffLabel
  if (diffFloat < -1.0) {
    diffLabel = "Overleveled"
  } else if (diffFloat <= -0.8) {
    diffLabel = "Bottom"
  } else if (diffFloat <= -0.3) {
    diffLabel = "Low"
  } else if (diffFloat < 0.3) {
    diffLabel = "Mid"
  } else if (diffFloat < 0.8) {
    diffLabel = "High"
  } else if (diffFloat <= 1.0) {
    diffLabel = "Top"
  } else {
    // diffFloat > +1.0
    diffLabel = "Underleveled"
  }

  let diffFmt
  if (diffFloat < 0) {
    diffFmt = diffFloat.toFixed(2)
  } else if (diffFloat === 0) {
    diffFmt = "0.0"
  } else {
    // diffFloat > 0
    diffFmt = `+${diffFloat.toFixed(2)}`
  }

  return `${diffFmt} (${diffLabel})`
}
