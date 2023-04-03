import Link from "next/link"
import { Inter } from "next/font/google"
import styles from "./Navbar.module.css"

const inter = Inter({ subsets: ["latin"] })

export default function Header() {
  return (
    <>
      <div className={inter.className}>
        <Link href="/">
          <span className={styles.description}>TuneStreet</span>
        </Link>
        <div className={styles.userInfo}>user info</div>
      </div>
    </>
  )
}
