import { NextResponse } from "next/server"
import { withEdgeMiddlewareAuth } from '@clerk/nextjs/edge-middleware'

export default withEdgeMiddlewareAuth((req) => {
    const { sessionId } = req.auth

    if (sessionId) {
        // User is authenticated
        const destination = req.nextUrl.href
        const url = req.nextUrl.clone()

        url.pathname = '/auth/signin'
        url.searchParams.set('error', 'no-session')

        return NextResponse.redirect(url);
    }

    return NextResponse.next()
})