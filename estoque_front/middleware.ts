import { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<any> {
  return null;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
