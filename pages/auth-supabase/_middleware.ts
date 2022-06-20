import { NextRequest, NextResponse } from "next/server";

export default async function Middleware(req: NextRequest) {
    // User needs to become authenticated
    return NextResponse.next();
}