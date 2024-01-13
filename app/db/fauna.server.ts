import { Client, fql, FaunaError } from "fauna"
import { AwardPick, UserPick } from "~/types"

export let getUserPicksByUserId = async (userId: string) => {
  let client = new Client()

  try {
    let query = fql`UserPicks.byUserId(${userId}).first()`
    let response = await client.query<UserPick>(query)
    return response.data
  } catch (error) {
    if (error instanceof FaunaError) {
      console.error("FaunaError — ", error)
    } else {
      console.error("Non-Fauna Error — ", error)
    }
  } finally {
    client.close()
  }
}

export let createUserPicksForUserId = async (userId: string) => {
  let client = new Client()

  try {
    let query = fql`UserPicks.create({ userId: ${userId} })`
    let response = await client.query<UserPick>(query)
    if (response.data) {
      return response.data
    } else {
      throw new Error("Fauna succeeded but no user picks data found")
    }
  } catch (error) {
    if (error instanceof FaunaError) {
      console.error("FaunaError — ", error)
    } else {
      console.error("Non-Fauna Error — ", error)
    }
  } finally {
    client.close()
  }
}

export let updatePicksByUserId = async (
  userId: string,
  picks: Array<AwardPick>,
) => {
  let client = new Client()

  try {
    let query = fql`UserPicks.byUserId(${userId}).first()!.updateData({ picks: ${picks} })`
    let response = await client.query(query)
    if (response.data) {
      return response.data
    } else {
      throw new Error("Fauna succeeded but no data found after updating picks")
    }
  } catch (error) {
    if (error instanceof FaunaError) {
      console.error("FaunaError — ", error)
    } else {
      console.error("Non-Fauna Error — ", error)
    }
  } finally {
    client.close()
  }
}
