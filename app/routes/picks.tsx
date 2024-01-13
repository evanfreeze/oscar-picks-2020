import { getAuth } from "@clerk/remix/ssr.server"
import { LoaderFunctionArgs, redirect } from "@remix-run/node"
import {
  Link,
  Outlet,
  useFetchers,
  useLoaderData,
  useMatches,
} from "@remix-run/react"
import awardsData from "~/2023-awards-data.json"
import {
  createUserPicksForUserId,
  getUserPicksByUserId,
} from "~/db/fauna.server"
import { slugifyAwardName } from "~/helpers"

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args)

  if (!userId) {
    throw redirect(`/sign-in?redirect_url=${args.request.url}`)
  }

  let picks = await getUserPicksByUserId(userId)

  if (!picks) {
    picks = await createUserPicksForUserId(userId)
  }

  const navData = Array.from(Object.keys(awardsData)).map((awardName) => ({
    awardName,
    pick:
      (picks?.picks ?? []).find((pick) => pick.awardName === awardName) ?? null,
  }))

  return { navData }
}

export default function PicksPage() {
  const { navData } = useLoaderData<typeof loader>()
  const matches = useMatches()

  const selectedAwardName = matches.find((match) => match.pathname === "/picks")
    ?.params.awardName

  const fetchers = useFetchers()

  return (
    <div className="grid grid-cols-[auto_1fr] gap-8">
      <section>
        <h2 className="text-xl font-bold mb-1">Awards</h2>
        <ul className="space-y-1">
          {navData.map((item) => {
            const slugifiedAwardName = slugifyAwardName(item.awardName)
            const isActive = slugifiedAwardName === selectedAwardName
            return (
              <li
                key={item.awardName}
                className={`grid grid-cols-[16px_1fr] items-center gap-1 -ml-10 px-3 rounded-md ${
                  isActive
                    ? "bg-gray-300 font-semibold shadow-inner"
                    : "hover:bg-gray-200"
                }`}
              >
                {item.pick ? <span>✅</span> : <span></span>}
                <Link
                  to={`/picks/${slugifyAwardName(item.awardName)}`}
                  className={`block py-1 px-2`}
                >
                  {item.awardName}{" "}
                  {fetchers.find((fetcher) => fetcher.key === item.awardName)
                    ?.state === "submitting"
                    ? "⏳"
                    : ""}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
      <section>
        {selectedAwardName ? (
          <Outlet />
        ) : (
          <div className="grid min-h-[60vh] place-content-center text-gray-500">
            <p>No award selected</p>
          </div>
        )}
      </section>
    </div>
  )
}
