import { AwardPick } from "./types"

export function mergePicks(
  oldPicks: Array<AwardPick>,
  newPicks: Array<AwardPick>,
) {
  const map = new Map<string, string>()

  oldPicks.forEach((value) => {
    map.set(...encodePick(value))
  })

  newPicks.forEach((value) => {
    map.set(...encodePick(value))
  })

  const mergedPicks: Array<AwardPick> = []

  map.forEach((value, key) => {
    mergedPicks.push(decodePick(key, value))
  })

  return mergedPicks
}

function encodePick(awardPick: AwardPick): [string, string] {
  const key = awardPick.year + "_" + awardPick.awardName
  return [key, awardPick.pick]
}

function decodePick(key: string, pick: string) {
  const [year, awardName] = key.split("_")
  return { year, awardName, pick } as AwardPick
}

export function slugifyAwardName(awardName: string) {
  return awardName
    .toLowerCase()
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll(" ", "-")
}
