import { NextRequest, NextResponse } from "next/server";

export const middleware = async(request: NextRequest) => {
    const token = request.cookies.get("access_token")
    console.log(token, "token")
    if(token){
        return NextResponse.next()
    }
    return NextResponse.redirect(
        new URL("/login", request.url)
    )
}

export const config = {
    matcher: "/admin/:path*"
}