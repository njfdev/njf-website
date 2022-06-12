import { H1, H2 } from "components/CustomTags";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { SubmitButtonWithProgressSpinner } from "components/Animated";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin?error=no-session',
                permanent: false,
            },
        };
    }

    return {
        props: {
            server_session: session,
        },
    };
}

export default function Account({ server_session }) {
    const [session, setSession] = useState(server_session);
    const { data: client_session, status } = useSession();
    const [loading, setLoading] = useState();
    const router = useRouter();

    const onSignOut = async (e) => {
        e.preventDefault();

        setLoading(true)
        const _result = await signOut({ redirect: false });
        setLoading(false);

        toast.success("You Have Been Signed Out");
        router.push("/auth/signin");
    }

    useEffect(() => {
        if (status === 'authenticated') {
            setSession(client_session);
        } else if (status === 'unauthenticated') {
            router.push('/auth/signin?error=no-session');
        }
    }, [status, client_session]);

    return (
        <>
            <Head>
                <title>Account | njf</title>
            </Head>
            <div className="p-5 md:p-10">
                <H1>Account</H1>
                <br/>
                <H2>{`First Name: ${session.user.first_name}`}</H2>
                <H2>{`Last Name: ${session.user.last_name}`}</H2>
                <H2>{`Username: ${session.user.username}`}</H2>
                <H2>{`Email: ${session.user.email}`}</H2>
                <form onSubmit={onSignOut} className="w-max">
                    <SubmitButtonWithProgressSpinner buttonText="Sign Out" loading={loading} />
                </form>
            </div>
        </>
    );
}