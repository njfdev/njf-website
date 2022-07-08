import Head from 'next/head'

export default function SignUpPage() {
    return (
        <>
            <Head>
                <title>Sign Up | njf</title>
            </Head>
            <div className="flex flex-col gap-10 justify-center w-[100%] py-10">
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