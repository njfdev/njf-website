import { H1, Input, Label } from 'components/CustomTags';
import { signIn, getSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Router, useRouter } from 'next/router'
import Head from 'next/head';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: '/account?error=already-has-session',
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    }
}

function SignIn() {
    const [email_username, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSignIn = async (e) => {
        e.preventDefault();

        const status = await signIn('credentials', {
            redirect: false,
            callbackUrl: '/account',
            email_username: email_username,
            password: password,
        });

        if (!status.error) {
            toast.success("You Have Been Login In")
            router.push(router.query.redirect ? router.query.redirect : "/account");
        } else {
            toast.error(status.error)
        }
    };

    return (
        <>
            <Head>
                <title>Login | njf</title>
            </Head>
            <div className='flex flex-col gap-10 p-10'>
                <H1 className="mx-auto w-max !text-4xl">Login</H1>
                <form className='flex flex-col gap-2 mx-auto w-max' onSubmit={handleSignIn}>
                    <Label labelFor="email_username">Email or Username: </Label>
                    <Input type="text" id="email_username" name="email_username" value={email_username} onChange={(e) => {setEmailUsername(e.target.value)}} />
                    <Label labelFor="password">Password: </Label>
                    <Input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    <Input type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default SignIn;