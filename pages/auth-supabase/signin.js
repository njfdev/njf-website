import { H1, Label, Input } from 'components/CustomTags';
import { SubmitButtonWithProgressSpinner } from 'components/Animated';
import { supabase } from 'lib/supabase';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const submitCredentials = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const { user, session, error } = await supabase.auth.signIn({
                email: email || " ",
                password: password || " ",
            });

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Log in successful!");
            }

            setLoading(false);
        } catch (error) {
            toast.error(error.error_description || error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>Sign In | njf</title>
            </Head>
            <div className="flex flex-col gap-10 justify-center w-[100%] py-10">
                <H1 className="mx-auto !text-6xl">Sign In</H1>
                <form className='w-max flex flex-col gap-2 mx-auto' onSubmit={submitCredentials}>
                    <div>
                        <Label labelFor="email">Email: </Label>
                        <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Label labelFor="password">Password: </Label>
                        <Input id="password" name="email_username" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <SubmitButtonWithProgressSpinner buttonText="Sign In" loading={loading}/>
                </form>
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