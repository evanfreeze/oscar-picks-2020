import { describe, expect, it } from "vitest"
import { mergePicks, slugifyAwardName } from "../helpers"
import { AwardPick } from "~/types"

const [oppBP, barBP, lilyLA]: Array<AwardPick> = [
  {
    year: "2024",
    awardName: "Best Picture",
    pick: "Oppenheimer",
  },
  {
    year: "2024",
    awardName: "Best Picture",
    pick: "Barbie",
  },
  {
    year: "2024",
    awardName: "Actress in a Leading Role",
    pick: "Lily Gladstone",
  },
]

describe("mergePicks", () => {
  it("adds a new pick", () => {
    expect(mergePicks([], [oppBP])).toEqual([oppBP])
  })

  it("updates an existing pick", () => {
    expect(mergePicks([oppBP], [barBP])).toEqual([barBP])
  })

  it("updates an existing pick while leaving other picks unchanged", () => {
    expect(mergePicks([oppBP, lilyLA], [barBP])).toEqual([barBP, lilyLA])
  })
})

describe("slugifyAwardName", () => {
  it("transforms an award name to a URL slug", () => {
    expect(slugifyAwardName("Actress in a Leading Role")).toEqual(
      "actress-in-a-leading-role",
    )
  })

  it("transforms an award name to a URL slug when it has parentheses", () => {
    expect(slugifyAwardName("Writing (Adapted Screenplay)")).toEqual(
      "writing-adapted-screenplay",
    )
  })
})
