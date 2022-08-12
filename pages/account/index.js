import Head from "next/head";
import { RedirectToSignIn, SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";

export default function Account() {
    return (
        <>
            <Head>
                <title>Account | njf</title>
            </Head>

            <SignedIn>
                <ProtectedPage />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}

function ProtectedPage() {

    return (
        <div className="mx-auto pt-10 w-min">
            <UserProfile />
        </div>
    )
}