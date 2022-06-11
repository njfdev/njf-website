import Head from "next/head";
import { H1 } from 'components/CustomTags';

export default function Admin() {
    return (
        <>
            <Head>
                <title>Admin Dashboard | njf</title>
            </Head>

            <div className="flex flex-col w-[100%] p-10">
                <H1 className="mx-auto w-max !text-6xl">Admin Panel</H1>
            </div>
        </>
    );
}