import { getAuth } from "@clerk/remix/ssr.server"
import { LoaderFunctionArgs, redirect } from "@remix-run/node"

export async function requireUserId(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args)
  if (!userId) {
    throw redirect(`/sign-in?redirect_url=${args.request.url}`)
  }
  return userId
}
