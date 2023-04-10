import "@/styles/globals.css"
import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import Layout from "@/components/Layout"
import { AuthProvider } from "@/components/authentication"
import { SWRConfig } from "swr"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <SWRConfig
      value={{
        onErrorRetry: (error) => {
          // Never retry on 401.
          if (error.status === 401) return
        },
      }}
    >
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SWRConfig>
  )
}
