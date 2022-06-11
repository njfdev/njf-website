import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from 'lib/helpers';

export default async function Middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        // User is unauthenticated
        return NextResponse.redirect(`${baseUrl}/auth/signin`);
    }

    if ((token as any).data.isAdmin) {
        // User is an admin
        return NextResponse.next();
    }

    // User is not an admin
    return NextResponse.redirect(`${baseUrl}/account`);
}