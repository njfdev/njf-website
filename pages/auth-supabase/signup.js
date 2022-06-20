import { H1, Label, Input } from 'components/CustomTags';
import { SubmitButtonWithProgressSpinner } from 'components/Animated';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { supabase } from 'lib/supabase';

export default function SignUp() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const submitUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Sign Up Successful! Please check your inbox for a confirmation email.");
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
                <title>Sign Up | njf</title>
            </Head>
            <div className="flex flex-col gap-10 justify-center w-[100%] py-10">
                <H1 className="mx-auto !text-6xl">Sign Up</H1>
                <form className='w-max flex flex-col gap-3 mx-auto' onSubmit={submitUser}>
                    <div className='flex gap-2'>
                        <Label labelFor="first_name">First Name: </Label>
                        <Input className="grow" id="first_name" name="first_name" type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className='flex gap-2'>
                        <Label labelFor="last_name">Last Name: </Label>
                        <Input className="grow" id="last_name" name="last_name" type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='flex gap-2'>
                        <Label labelFor="email">Email: </Label>
                        <Input className="grow" id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex gap-2'>
                        <Label labelFor="username">Username: </Label>
                        <Input className="grow" id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex gap-2'>
                        <Label labelFor="password">Password: </Label>
                        <Input className="grow" id="password" name="email_username" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <SubmitButtonWithProgressSpinner buttonText="Sign Up" loading={loading}/>
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