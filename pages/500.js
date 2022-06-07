import { H1 } from "components/CustomTags"
import Head from "next/head"

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export async function getStaticProps(context) {
    return {
        props: {},
    }
}

export default function Custom500() {
    return (
        <>
            <Head>
                <title>Server Error | njf</title>
            </Head>

            <div className="flex flex-col justify-center absolute left-0 top-0 w-[100%] h-[100%]">
                <H1 className="w-max mx-auto">500 | A Server Error Occurred - Please Try Again Later</H1>
            </div>
        </>
    )
}