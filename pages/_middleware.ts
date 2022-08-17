// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (!request.nextUrl.pathname.startsWith('/api/webhooks')) {
        if (request.ip !== undefined) {
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}