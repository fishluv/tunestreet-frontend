import Head from "next/head"
import { useAuth } from "@/components/authentication"
import Link from "next/link"

export default function MePage() {
  const auth = useAuth()
  const {
    loggedInUser: { username, email },
  } = auth

  if (username || email) {
    return (
      <>
        <Head>
          <title>Update my info • TuneStreet</title>
        </Head>
        Username: {username}
      </>
    )
  } else {
    return <Link href="/login">Log in</Link>
  }
}
