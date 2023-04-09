import { EntityOptions } from "./EntityOptions"
import MyEntityRatings from "./MyEntityRatings"
import SiteEntityRatings from "./SiteEntityRatings"

export default function EntityRatings({ entityType, entityId }: EntityOptions) {
  return (
    <>
      <SiteEntityRatings entityType={entityType} entityId={entityId} />
      <MyEntityRatings entityType={entityType} entityId={entityId} />
    </>
  )
}
