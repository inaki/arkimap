import { NextResponse } from "next/server";

const signedinPages = ["/admin"];

export default function middleware(req) {
  if (signedinPages.find((page) => req.nextUrl.pathname.startsWith(page))) {
    const token = req.cookies.ARKIMAP_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.redirect("http://localhost:3000/signin");
    }
  }
  return NextResponse.next();
}
