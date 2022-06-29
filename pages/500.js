import Head from "next/head";

export default function Custom500() {
    return (
        <>
            <Head>
                <title>Server Error</title>
            </Head>

            <h1>500 | A Server Error Occurred - Please Try Again Later</h1>
        </>
    )
}