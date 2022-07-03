import Head from 'next/head'
import { RedirectToUserProfile, SignedIn, SignedOut, SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <>
            <Head>
                <title>Sign In | njf</title>
            </Head>
            <div className="flex flex-col gap-10 justify-center w-[100%] py-10">
                <SignedOut>
                    <SignIn />
                </SignedOut>
                <SignedIn>
                    <RedirectToUserProfile />
                </SignedIn>
            </div>
        </>
    );
}

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export async function getStaticProps(context) {
    return {
        props: {},
    }
}