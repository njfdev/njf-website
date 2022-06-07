import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const session = await getToken({ req, secret: process.env.SECRET });
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.VERCEL_URL;

    if (session) {
        return NextResponse.redirect(`${baseUrl}/account?error=already-has-session`);
    }

    // If user needs to login
    return NextResponse.next();
}