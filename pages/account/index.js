import Head from "next/head";
import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { SignedIn, SignedOut, SignOutButton, UserProfile, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

export const getServerSideProps = withServerSideAuth(async ({ req }) => {
    const { userId, sessionId, getToken } = req.auth;
    
    if (!sessionId) {
        return {
            redirect: {
                destination: '/auth/signin?error=no-session',
                permanent: false,
            },
        };
    }

    const token = await getToken();

    console.log(token)

    return {
        props: {
            server_session: token,
        },
    };
})

export default function Account({ server_session }) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Account | njf</title>
            </Head>
            <div className="p-5 md:p-10">
                <SignedIn>
                    <UserProfile />
                    <SignOutButton className="text-white bg-blue-700 rounded-lg p-2 text-2xl" />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </div>
        </>
    );
}