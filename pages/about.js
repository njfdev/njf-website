import Head from "next/head";
import { useEffect } from "react";
import { getSupabase } from 'lib/supabase'

function About() {
    useEffect(() => {
        (async () => {
            console.log(
                await (await getSupabase())
                    .rpc('get_is_pro')
            );
        })()

        return;
    }, [])

    return (
        <>
            <Head>
                <title>About | njf</title>
                <meta name="description" content="Learn more about the hobbyist developer Nicholas Fasching." />
            </Head>
            <div className="p-10">

            </div>
        </>
    )
}

export default About;

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export async function getStaticProps(context) {
    return {
        props: {},
    }
}