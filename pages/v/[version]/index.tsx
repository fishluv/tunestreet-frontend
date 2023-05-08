import VersionPage from "@/components/VersionPage"
import { GetStaticPaths, GetStaticProps } from "next"
import { VERSION_FOLDERS } from "popn-db-js"

export default VersionPage

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = VERSION_FOLDERS.map((paddedVersion) => {
    let unpaddedVersion
    if (paddedVersion === "cs") {
      unpaddedVersion = paddedVersion
    } else {
      unpaddedVersion = String(parseInt(paddedVersion))
    }
    return { params: { version: unpaddedVersion } }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  unpaddedVersion: string
}> = async (context) => {
  const unpaddedVersion = context.params?.version as string

  return {
    props: {
      unpaddedVersion,
    },
  }
}
