import LevelPage from "@/components/LevelPage"
import { GetStaticPaths, GetStaticProps } from "next"
import { LEVELS } from "popn-db-js"

export default function LevelPageHandler({ level }: { level: number }) {
  return LevelPage(level)
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = LEVELS.map((level) => ({ params: { level: String(level) } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ level: number }> = async (
  context,
) => {
  const levelStr = context.params?.level as string
  const level = parseInt(levelStr)

  return {
    props: {
      level,
    },
  }
}
