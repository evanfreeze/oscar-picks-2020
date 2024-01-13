import { Link, useFetchers } from "@remix-run/react"
import { buildAwardsNavigationList } from "~/utils/helpers"

type AwardPageLinkProps = {
  item: ReturnType<typeof buildAwardsNavigationList>[0]
  fetchers: ReturnType<typeof useFetchers>
  isActive: boolean
}

export default function AwardPageLink({
  item,
  fetchers,
  isActive,
}: AwardPageLinkProps) {
  return (
    <li
      key={item.awardName}
      className={`grid grid-cols-[16px_1fr] items-center gap-1 -ml-10 px-3 rounded-md ${
        isActive
          ? "bg-gray-300 font-semibold shadow-inner"
          : "hover:bg-gray-200"
      }`}
    >
      {item.isPicked ? <span>✅</span> : <span></span>}
      <Link to={`/picks/${item.awardSlug}`} className={`block py-1 px-2`}>
        {item.awardName}{" "}
        {fetchers.find((fetcher) => fetcher.key === item.awardName)?.state ===
        "submitting"
          ? "⏳"
          : ""}
      </Link>
    </li>
  )
}
