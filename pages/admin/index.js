import { H1 } from "components/CustomTags";
import { getUserServer } from "lib/user";
import { getSession } from "next-auth/react";
import Head from "next/head";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: `/login?error=no-session&redirect=${context.req.url}`,
                permanent: false,
            },
        };
    }
    const user = await getUserServer(session);
    if (!user.data.isAdmin) {
        return {
            redirect: {
                destination: '/?error=insufficient-privileges&title=The%20Admin%20Dashboard',
                permanent: false,
            },
        };
    }
    return {
        props: { session, user },
    };
}

export default function Admin() {
    return (
        <>
            <Head>
                <title>Dashboard | njf</title>
            </Head>

            <div className="flex flex-col justify-center p-10">
                <H1 className="w-max mx-auto !text-6xl my-10">Welcome To The Admin Dashboard</H1>
            </div>
        </>
    );
}