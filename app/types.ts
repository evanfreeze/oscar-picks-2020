import awardsData from "./2023-awards-data.json"

export type Year = "2024"

export type AwardPick = {
  year: Year
  awardName: keyof typeof awardsData
  pick: string
}

export type UserPick = {
  userId: string
  picks: Array<AwardPick>
}
