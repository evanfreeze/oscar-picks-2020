import { getAuth } from "@clerk/remix/ssr.server"
import { LoaderFunction, redirect } from "@remix-run/node"

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args)
  if (!userId) {
    return redirect("/sign-in")
  }
  return redirect("/picks")
}
