import Link from "next/link"
import LoginOrMe from "./LoginOrMe"
import styles from "./Navbar.module.scss"

export default function Header() {
  return (
    <>
      <div className={styles.navbar}>
        <Link className={styles.link} href="/">
          <span className={styles.tune}>Tune</span>
          <span className={styles.street}>Street</span>
        </Link>
        <LoginOrMe />
      </div>
    </>
  )
}
