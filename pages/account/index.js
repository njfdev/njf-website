import { H1, H2 } from "components/CustomTags";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
            <div>
                <div>
                    <H1>Account</H1>
                    <H2>{JSON.stringify(session.user)}</H2>
                </div>
            </div>
        </>
    );
}