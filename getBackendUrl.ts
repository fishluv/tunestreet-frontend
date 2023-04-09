import urlJoin from "url-join"

export default function getBackendUrl(...parts: string[]) {
  return urlJoin(process.env.NEXT_PUBLIC_TUNESTREET_BACKEND_URL!, ...parts)
}
