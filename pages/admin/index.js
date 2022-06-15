import Head from "next/head";
import { H1 } from 'components/CustomTags';
import NavBarLink from "components/NavBarLink";
import { mdiGoogleAnalytics } from '@mdi/js';

export default function Admin() {
    return (
        <>
            <Head>
                <title>Admin Dashboard | njf</title>
            </Head>

            <div className="flex flex-col w-[100%] p-10 items-center gap-5">
                <H1 className="w-max !text-6xl">Admin Panel</H1>
                <NavBarLink icon={mdiGoogleAnalytics} href='/admin/analytics'>Analytics</NavBarLink>
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