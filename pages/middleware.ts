import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("--------", request.nextUrl);
  return NextResponse.redirect(new URL("/about-2", request.url));
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/:path*",
// };
