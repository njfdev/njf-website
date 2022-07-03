import { NextResponse } from "next/server"
import { withEdgeMiddlewareAuth } from '@clerk/nextjs/edge-middleware'

export default withEdgeMiddlewareAuth((req) => {
    const { sessionId } = req.auth

    if (!sessionId) {
        // User is unauthenticated
        const destination = req.nextUrl.href
        const url = req.nextUrl.clone()

        url.pathname = '/auth/signin'
        url.searchParams.set('error', 'no-session')
        url.searchParams.set('callbackUrl', destination)

        return NextResponse.redirect(url);
    }

    return NextResponse.next()

    // use later
    //if ((token as any).data.isAdmin) {
    //    // User is an admin
    //    return NextResponse.next();
    //}
    //
    //// User is not an admin
    //return NextResponse.redirect(`${baseUrl}/account?error=not-admin`);
})