import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { getBackendUrl } from "@/lib/backendUrls"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const onEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
  }

  const onEmailInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onLoginButtonClick()
    }
  }

  const [emailSending, setEmailSending] = useState(false)
  const [emailSucceeded, setEmailSucceeded] = useState(false)
  const [emailFailed, setEmailFailed] = useState(false)
  const [emailThatWasSent, setEmailThatWasSent] = useState("")
  const onLoginButtonClick = () => {
    if (emailSending) {
      return
    }

    setEmailSending(true)
    fetch(getBackendUrl("/login/requests"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const maybeEmail = data?.user?.email
        if (maybeEmail) {
          setEmailFailed(false)
          setEmailSucceeded(true)
          setEmailThatWasSent(maybeEmail)
        } else {
          setEmailSucceeded(false)
          setEmailFailed(true)
        }
        setEmailSending(false)
      })
  }

  return (
    <>
      <Head>
        <title>Log in • TuneStreet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input
        type="text"
        value={email}
        onChange={onEmailInputChange}
        onKeyUp={onEmailInputKeyUp}
      />
      <button
        className={styles.loginButton}
        onClick={onLoginButtonClick}
        disabled={emailSending}
      >
        Log in
      </button>
      {emailSending ? (
        <span>Sending email...</span>
      ) : (
        <>
          {emailSucceeded ? (
            <span>Email sent to {emailThatWasSent}</span>
          ) : (
            <>
              {emailFailed && (
                <span>
                  Something went wrong. Make sure your email is correct, then
                  retry.
                </span>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
