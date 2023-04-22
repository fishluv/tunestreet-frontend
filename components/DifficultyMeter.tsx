export default function DifficultyMeter({
  valueInQuarters,
  onChange,
}: {
  valueInQuarters: number
  onChange(newValueInQuarters: number): void
}) {
  function prepareCircles() {
    const circles = []
    for (let i = -5; i <= 5; i++) {
      let styleObj
      if (i < 0) {
        styleObj = {
          backgroundColor: `rgba(${250 - 50 * Math.abs(i)}, ${
            250 - 50 * Math.abs(i)
          }, 250, 0.5)`,
        }
      } else if (i > 0) {
        styleObj = {
          backgroundColor: `rgba(250, ${250 - 50 * Math.abs(i)}, ${
            250 - 50 * Math.abs(i)
          }, 0.5)`,
        }
      }

      let char
      if (i == 0) {
        char = "x"
      } else if (i < 0) {
        char = i >= valueInQuarters ? "x" : "o"
      } else {
        // i > 0
        char = i <= valueInQuarters ? "x" : "o"
      }

      circles.push(
        <span key={i} style={styleObj} onClick={() => onChange(i)}>
          -{char}-
        </span>,
      )
    }
    return circles
  }

  return <div>{prepareCircles()}</div>
}
