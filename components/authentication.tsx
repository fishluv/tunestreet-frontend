import React, { useState, useContext, createContext, ReactNode } from "react"

interface LoggedInUser {
  username: string | null
  email: string | null
}

const LOGGED_OUT_USER: LoggedInUser = {
  username: null,
  email: null,
}

interface Auth {
  loggedInUser: LoggedInUser
  onLogin(loggedInUser: LoggedInUser): void
  onLogout(): void
}

const NULL_AUTH: Auth = {
  loggedInUser: LOGGED_OUT_USER,
  onLogin: (loggedInUser: LoggedInUser) => {},
  onLogout: () => {},
}

const AuthContext = createContext<Auth>(NULL_AUTH)

// Provider component that wraps app and makes auth
// available to any child component that calls useAuth().
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth_Setup()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useAuth_Setup(): Auth {
  const [loggedInUser, setLoggedInUser] = useState(LOGGED_OUT_USER)

  const onLogin = (userResponse: LoggedInUser) => {
    setLoggedInUser(userResponse)
  }

  const onLogout = () => {
    setLoggedInUser(LOGGED_OUT_USER)
  }

  return {
    loggedInUser,
    onLogin,
    onLogout,
  }
}

// Hook for child components to get auth
// and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext)
}
