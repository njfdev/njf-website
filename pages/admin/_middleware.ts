import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function (req: NextRequest) {
    // TODO: Remove this line of code
    return NextResponse.next();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        // User is unauthenticated
        return NextResponse.redirect('/auth/signin');
    }

    if (token.data.isAdmin) {
        // User is an admin
        return NextResponse.next();
    }

    // User is not an admin
    return NextResponse.redirect('/account');
}