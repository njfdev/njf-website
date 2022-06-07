import { H1 } from "components/CustomTags";
import { getUserServer } from "lib/user";
import { getSession } from "next-auth/react";
import Head from "next/head";

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

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export async function getStaticProps(context) {
    return {
        props: {},
    }
}