import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  // extracting current pathname
  const pathName = req.nextUrl.pathname;

  const token = req.cookies.get("accessToken");

  const isPublic = pathName === "/" || pathName === "/login";
  const isPrivate =
    pathName.startsWith("/about/") ||
    pathName === "/about" ||
    pathName.startsWith("/createtodo/") ||
    pathName.startsWith("/updatetodo/");

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/about", req.nextUrl));
  }
  if (!token && isPrivate) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};


