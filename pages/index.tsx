import Head from "next/head"
import styles from "@/styles/Home.module.css"
import clsx from "clsx"
import Link from "next/link"
import { pillFont } from "@/components/fonts"

export default function Home() {
  return (
    <>
      <Head>
        <title>TuneStreet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx(styles.main, pillFont.className)}>
        <div>
          <h1>
            <Link href="/lv">Browse by level</Link>
          </h1>
          <h1>
            <Link href="/v">Browse by version</Link>
          </h1>
        </div>
      </main>
    </>
  )
}
