import * as build from "@remix-run/dev/server-build"
import { createRequestHandler } from "@netlify/remix-adapter"

const handler = createRequestHandler({
  // @ts-expect-error spa mode thing
  build,
  mode: process.env.NODE_ENV,
})

export default handler

export const config = { path: "/*", preferStatic: true }
