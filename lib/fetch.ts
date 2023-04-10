import { useAuth } from "@/components/authentication"
import { EntityOptions } from "@/components/EntityOptions"
import useSWR from "swr"
import { getBackendUrl, getSiteEntityRatingsUrl } from "./backendUrls"

class HttpError extends Error {
  data: any
  status: number

  constructor(data: any, status: number) {
    super("Error")
    this.data = data
    this.status = status
  }
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    const data = await res.json()
    throw new HttpError(data, res.status)
  }

  return res.json()
}

async function urlFetcher(url: string) {
  const res = await fetch(url, { credentials: "include" })

  return handleResponse(res)
}

export function useFetchLoginState() {
  const auth = useAuth()

  async function fetcher(url: string) {
    const res = await fetch(url, { credentials: "include" })
    const data = await res.json()
    const { user } = data
    if (user) {
      auth.onLogin(user)
    } else {
      auth.onLogout()
    }
    return data
  }

  return useSWR(getBackendUrl("/users/me"), fetcher)
}

export function useSiteEntityRatings(entityOptions: EntityOptions) {
  return useSWR(getSiteEntityRatingsUrl(entityOptions), urlFetcher)
}

export function useMyEntityRatings({ entityType, entityId }: EntityOptions) {
  const url = getBackendUrl(
    "/ratings/mine",
    `?entity_type=${entityType}&entity_id=${entityId}`,
  )
  return useSWR(url, urlFetcher)
}

export async function saveMyEntityRating({
  entityType,
  entityId,
  type,
  value,
}: {
  entityType: string
  entityId: string
  type: string
  value: string
}) {
  const saveRatingUrl = getBackendUrl(
    "/ratings/mine",
    `?entity_type=${entityType}`,
    `?entity_id=${entityId}`,
    `?type=${type}`,
    `?value=${value}`,
  )

  const res = await fetch(saveRatingUrl, {
    method: "PUT",
    credentials: "include",
  })

  return handleResponse(res)
}
