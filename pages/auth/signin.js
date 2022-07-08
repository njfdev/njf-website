import Head from 'next/head'
import { Auth } from '@supabase/ui';
import { useUser } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { P } from 'components/CustomTags'
import { useRouter } from 'next/router';

export default function SignInPage() {
    const { user, error } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/account')
        }
    }, [user])

    return (
        <>
            <Head>
                <title>Sign In | njf</title>
            </Head>
            <div className="w-[500px]">
                {error && <P>{error.message}</P>}
                <Auth
                    supabaseClient={supabaseClient}
                    providers={['github']}
                    socialLayout='vertical'
                    socialButtonSize='xlarge' />
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