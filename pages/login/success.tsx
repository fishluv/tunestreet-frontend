import { useAuth } from "@/components/authentication"

export default function LoginSuccess() {
  const {
    loggedInUser: { email, username },
  } = useAuth()

  if (username || email) {
    return <span>Logged in successfully as {username || email}</span>
  } else {
    return <span>Logged in successfully</span>
  }
}
