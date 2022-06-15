import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { baseUrl } from "lib/helpers";
import { SHA512, SHA256, MD5 } from 'jshashes';

export async function middleware(req: NextRequest) {
    // TODO: Add this back
    //if (process.env.VERCEL_ENV === 'development') {
    //    return NextResponse.next();
    //}

    // If [req is for a page (ex: not /favicon.ico)]
    //    [req is not for authentication]
    if (req.page.name && !req.nextUrl.pathname.includes('/api')) {
        // Create an anonymous fingerprint of the user that can't be track over days
        const userInfo = JSON.stringify({ ip: req.ip, ua: req.ua, date: (new Date()).toISOString().slice(0, 10) });
        const userFingerprint = new SHA512().b64(userInfo);
        
        const analyticsRes = await fetch(`${baseUrl}/api/analytics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: process.env.SERVER_PASSWORD,
                user_fingerprint: userFingerprint,
                pathname: req.nextUrl.pathname
            }),
        });

        //console.log(`
        //nextUrl: ${req.nextUrl}
        //
        //ip: ${req.ip}
        //
        //ua: ${JSON.stringify(req.ua)}
        //
        //geo: ${JSON.stringify(req.geo)}
        //`);
    }

    return NextResponse.next();
}