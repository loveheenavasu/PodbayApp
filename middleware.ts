import { NextResponse } from "next/server";

export default function middleware(req: any) {
  const token = req.cookies.get("authToken")?.value;
  const url = req.nextUrl.clone();
  let redirect = false;

  if (url.pathname.includes('/_next/static/')) return;

  if (url.pathname === "/dashboard" && !token) {
    redirect = true;
    url.pathname = "/";
  } else if (url.pathname === "/" && token) {
    redirect = true;
    url.pathname = "/dashboard";
  }

  if (redirect) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

