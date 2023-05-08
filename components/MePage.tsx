import Head from "next/head"
import { useAuth } from "@/components/authentication"
import Link from "next/link"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { getBackendUrl } from "@/lib/backendUrls"

function UsernameUpdate({ initialUsername }: { initialUsername: string }) {
  const [confirmedUsername, setConfirmedUsername] = useState(initialUsername)
  const [pendingUsername, setPendingUsername] = useState(initialUsername)
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [confirmResult, setConfirmResult] = useState("")

  function onUsernameInputChange(e: ChangeEvent<HTMLInputElement>) {
    setPendingUsername(e.target.value)
  }

  function onUsernameEditButtonClick() {
    setIsEditing(true)
    setConfirmResult("")
  }

  function onUsernameInputKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onUsernameConfirmButtonClick()
    }
  }

  function onUsernameConfirmButtonClick() {
    if (isConfirming) {
      return
    }

    setIsConfirming(true)
    setConfirmResult("")

    fetch(getBackendUrl("/users/me"), {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: pendingUsername,
        },
      }),
    }).then((res) => {
      setConfirmResult(res.status === 200 ? "Success!" : "Failed. Try again.")
      setIsConfirming(false)
      setConfirmedUsername(pendingUsername)
      setIsEditing(false)
    })
  }

  function onUsernameCancelButtonClick() {
    setIsEditing(false)
    setPendingUsername(confirmedUsername)
  }

  if (isEditing) {
    return (
      <>
        Username:{" "}
        <input
          type="text"
          value={pendingUsername}
          onChange={onUsernameInputChange}
          onKeyUp={onUsernameInputKeyUp}
          width={32}
          disabled={isConfirming}
        />
        <button onClick={onUsernameConfirmButtonClick} disabled={isConfirming}>
          Confirm
        </button>
        <button onClick={onUsernameCancelButtonClick} disabled={isConfirming}>
          Cancel
        </button>
      </>
    )
  } else {
    return (
      <>
        Username: {confirmedUsername}{" "}
        <button onClick={onUsernameEditButtonClick}>Edit</button>
        {confirmResult}
      </>
    )
  }
}

export default function MePage() {
  const auth = useAuth()
  const {
    loggedInUser: { username, email },
  } = auth

  if (username || email) {
    return (
      <>
        <Head>
          <title>My info • TuneStreet</title>
        </Head>
        <UsernameUpdate initialUsername={username ?? ""} />
      </>
    )
  } else {
    return <Link href="/login">Log in</Link>
  }
}
