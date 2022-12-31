import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectRecentlyActiveId } from "../../store/resumeSlice"

const RecentResume = () => {
  const router = useRouter()
  const recentlyActiveId = useSelector(selectRecentlyActiveId)

  useEffect(() => {
    if (recentlyActiveId)
      router.replace({
        pathname: '/resume/[id]',
        query: { id: recentlyActiveId },
      })
    else {
      router.replace(`/dashboard`)
    }
  }, [recentlyActiveId])
}

export default RecentResume
