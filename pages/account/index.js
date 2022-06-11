import { H1, H2 } from "components/CustomTags";
import { getSession, useSession } from "next-auth/react";

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
            session,
        },
    };
}

export default function Account() {
    const { data: session, status } = useSession();

    return (
        <>
            <div>
                {status === 'authenticated' &&
                    <div>
                        <H1>Account</H1>
                        <H2>{JSON.stringify(session.user)}</H2>
                    </div>
                }
            </div>
        </>
    );
}