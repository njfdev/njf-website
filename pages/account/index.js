import { H1, H2, Input } from "components/CustomTags";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
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
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            setSession(client_session);
        } else if (status === 'unauthenticated') {
            router.push('/auth/signin');
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
                <form onSubmit={() => signOut()}>
                    <Input type="submit" value="Sign Out"/>
                </form>
            </div>
        </>
    );
}