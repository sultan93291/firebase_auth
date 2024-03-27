import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export default function middleware(req: NextRequest) {
  // extracting current pathname
  const pathName = req.nextUrl.pathname;

  const token = req.cookies.get("accessToken")?.value;

  let TokenId;

  if (token !== null && token !== undefined && token) {
    const decode = jwt.decode(token);
    TokenId = (decode as JwtPayload)?.user_id;
  }

  const isPublic = pathName === "/" || pathName === "/login";
  const isPrivate =
    pathName.startsWith("/about/") ||
    pathName === "/about" ||
    pathName.startsWith("/createtodo/") ||
    pathName.startsWith("/updatetodo/");

  if (token && isPublic && TokenId) {
    return NextResponse.redirect(new URL("/about", req.nextUrl));
  }
  if (!token && isPrivate ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
