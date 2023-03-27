import { useRouter } from "next/router"

const Post = () => {
  const router = useRouter()
  const { sid } = router.query

  return <p>Post: {sid}</p>
}

export default Post
