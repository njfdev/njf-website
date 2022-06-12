import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from 'lib/helpers';

export default async function Middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token) {
        // User is already authenticated
        return NextResponse.redirect(`${baseUrl}/account?error=has-session`);
    }

    // User needs to become authenticated
    return NextResponse.next();
}