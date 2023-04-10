import { EntityOptions } from "@/components/EntityOptions"
import urlJoin from "url-join"

export function getBackendUrl(...parts: string[]) {
  return urlJoin(process.env.NEXT_PUBLIC_TUNESTREET_BACKEND_URL!, ...parts)
}

export function getSiteEntityRatingsUrl({
  entityType,
  entityId,
}: EntityOptions) {
  return getBackendUrl(
    "/ratings/site",
    `?entity_type=${entityType}&entity_id=${entityId}`,
  )
}
