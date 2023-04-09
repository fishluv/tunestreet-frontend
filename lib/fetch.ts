import useSWR from "swr"

class HttpError extends Error {
  data: any
  status: number

  constructor(data: any, status: number) {
    super("Error")
    this.data = data
    this.status = status
  }
}

async function urlFetcher(url: string) {
  const res = await fetch(url, { credentials: "include" })

  if (!res.ok) {
    const data = await res.json()
    throw new HttpError(data, res.status)
  }

  return res.json()
}

export function useFetch(url: string) {
  return useSWR(url, urlFetcher)
}
