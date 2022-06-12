import { H1, Label, Input } from 'components/CustomTags';
import { SubmitButtonWithProgressSpinner } from 'components/Animated';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SignIn() {
    const [email_username, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const submitCredentials = async (e) => {
        e.preventDefault();

        setLoading(true);
        const status = await signIn('credentials', {
            email_username: email_username,
            password, password,
            redirect: false,
        });
        setLoading(false);

        if (status.error) {
            toast.error(status.error);
            return;
        }

        toast.success("You Have Been Logged In");
        router.push(router.query.callbackUrl ? router.query.callbackUrl : '/account');
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
                        <Label labelFor="email_username">Email or Username: </Label>
                        <Input id="email_username" name="email_username" type="text" value={email_username} onChange={(e) => setEmailUsername(e.target.value)} />
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