import { getUserServer } from 'lib/user';
import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const session = await getToken({ req, secret: process.env.SECRET });
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.VERCEL_URL;

    if (!session) {
        return NextResponse.redirect(`${baseUrl}/login?error=no-session&redirect=${req.url}`);
    } 
    
    const user = await getUserServer({ user: session });
    if (!user.data.isAdmin) {
        return NextResponse.redirect(`${baseUrl}/?error=insufficient-privileges&title=The%20Admin%20Dashboard`);
    }

    // If user is an admin
    return NextResponse.next();
}