// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //   console.log("teste middleware");
  //   // return NextResponse.redirect(new URL("/about-2", request.url));
  //   return;
}

// export const config = {
//   matcher: ["/about"],
// };
