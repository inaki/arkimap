import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const signedinPages = ["/admin"];

export default function middleware(req: NextRequest) {
  if (signedinPages.find((page) => req.nextUrl.pathname.startsWith(page))) {
    const token = req.cookies.get("ARKIMAP_ACCESS_TOKEN")?.value;

    if (!token) {
      return NextResponse.redirect(`http://localhost:3000/signin`);
    }
  }
  return NextResponse.next();
}
