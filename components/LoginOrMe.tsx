import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "./authentication"
import { getBackendUrl } from "@/lib/backendUrls"
import { useFetchLoginState } from "@/lib/fetch"

export default function LoginOrMe() {
  const router = useRouter()
  const auth = useAuth()

  const { isLoading } = useFetchLoginState()

  const onLogoutClick = () => {
    fetch(getBackendUrl("/login/sessions"), {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      router.reload()
    })
  }

  const {
    loggedInUser: { username, email },
  } = auth

  if (isLoading) {
    return <span></span>
  } else if (username || email) {
    return (
      <div>
        <p>{username || email}</p>
        <Link href="#" onClick={onLogoutClick}>
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
