import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useRef } from "react"
import awardsData from "~/2023-awards-data.json"
import { CURRENT_YEAR } from "~/constants"
import {
  createUserPicksForUserId,
  getUserPicksByUserId,
  updatePicksByUserId,
} from "~/db/fauna.server"
import { mergePicks, slugifyAwardName } from "~/helpers"
import { requireUserId } from "~/helpers.server"
import { AwardPick } from "~/types"

export async function loader(args: LoaderFunctionArgs) {
  const userId = await requireUserId(args)

  let picks = await getUserPicksByUserId(userId)

  if (!picks) {
    picks = await createUserPicksForUserId(userId)
  }

  const [awardName, nominees] =
    Array.from(Object.entries(awardsData)).find(
      ([awardName]) => slugifyAwardName(awardName) === args.params.awardName,
    ) ?? []

  const { pick: currentPick } =
    (picks?.picks ?? []).find((pick) => pick.awardName === awardName) ?? {}

  return { awardName, nominees, currentPick }
}

export async function action(args: ActionFunctionArgs) {
  const userId = await requireUserId(args)

  const formData = await args.request.formData()
  const [submission] = Array.from(formData)
  const newPick: AwardPick = {
    awardName: String(submission[0]) as AwardPick["awardName"],
    pick: String(submission[1]),
    year: CURRENT_YEAR,
  }
  const existingPicks = await getUserPicksByUserId(userId)
  const mergedPicks = mergePicks(existingPicks?.picks ?? [], [newPick])
  const updatedPicks = await updatePicksByUserId(userId, mergedPicks)

  return { picks: updatedPicks }
}

export default function AwardPickerPage() {
  const { awardName, nominees, currentPick } = useLoaderData<typeof loader>()
  const formRef = useRef<HTMLFormElement>(null)
  const fetcher = useFetcher({ key: awardName })

  return (
    <fetcher.Form method="POST" ref={formRef} className="sticky top-6">
      <h3 className="text-xl font-bold ml-4">{awardName}</h3>
      <div className="grid my-4 max-w-fit gap-y-0.5">
        {(nominees ?? []).map((nominee) => (
          <label
            key={nominee.title}
            className="rounded-xl px-4 py-3 block cursor-pointer hover:bg-gray-200 has-[*:checked]:bg-gray-300 has-[*:checked]:shadow-inner"
          >
            <input
              type="radio"
              name={awardName}
              value={nominee.title}
              className="hidden"
              defaultChecked={currentPick === nominee.title}
              onClick={() => fetcher.submit(formRef.current)}
            />
            <p className="flex flex-col">
              <span className="text-md font-semibold leading-tight">
                {nominee.title}
              </span>
              <span className="text-gray-700 text-sm leading-tight">
                {nominee.subtitle}
              </span>
            </p>
          </label>
        ))}
      </div>
      {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold">
        Save Choice
      </button> */}
    </fetcher.Form>
  )
}
