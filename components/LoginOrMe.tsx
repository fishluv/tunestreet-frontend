import useSWR from "swr"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "./authentication"

export default function LoginOrMe() {
  const router = useRouter()
  const auth = useAuth()

  const { data } = useSWR("http://localhost:3000/users/me", async (url) => {
    const res = await fetch(url, { credentials: "include" })
    const data = await res.json()
    const { user } = data
    if (user) {
      auth.onLogin(user)
    } else {
      auth.onLogout()
    }
    return data
  })

  const onLogoutClick = () => {
    fetch("http://localhost:3000/login/sessions", {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      // auth.onLogout()
      router.reload()
    })
  }

  const {
    loggedInUser: { username, email },
  } = auth

  if (!data) {
    return <span></span>
  } else if (username || email) {
    return (
      <div>
        <p>{username || email}</p>
        <Link href="" onClick={onLogoutClick}>
          Log out
        </Link>
      </div>
    )
  } else {
    return (
      <span>
        <Link href="/login">Log in</Link>
      </span>
    )
  }
}
