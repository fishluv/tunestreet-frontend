import Hashids from "hashids"

const hashids = new Hashids(
  /* salt: */ process.env.NEXT_PUBLIC_HASHIDS_SALT!,
  /* minLength: */ 4,
  /* alphabet: */ "abcdefghijklmnopqrstuvwxyz",
  /* these chars can't be next to one another: */ undefined,
)

export function encodeSongId(songId: string) {
  return hashids.encode(songId)
}

export function decodeSongHashId(songHashId: string) {
  return hashids.decode(songHashId)
}
