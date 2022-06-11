import { H1, Label, Input } from 'components/CustomTags';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignIn() {
    const [email_username, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const submitCredentials = async (e) => {
        e.preventDefault();

        const status = await signIn('credentials', {
            email_username: email_username,
            password, password,
            redirect: false,
        });

        if (status.error) {
            // TODO: Implement Redirect with error functionality
            console.log(status.error);
            return;
        }

        router.push(router.query.callbackUrl ? router.query.callbackUrl : '/account')
    }

    return (
        <>
            <div className="flex flex-col gap-10 justify-center w-[100%] py-10">
                <H1 className="mx-auto !text-6xl">Sign In</H1>
                <form className='w-max flex flex-col gap-2 mx-auto' onSubmit={submitCredentials}>
                    <div>
                        <Label for="email_username">Email or Username: </Label>
                        <Input type="text" value={email_username} onChange={(e) => setEmailUsername(e.target.value)} />
                    </div>
                    <div>
                        <Label for="password">Password: </Label>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Input type="submit" className="w-max mx-auto my-1"/>
                </form>
            </div>
        </>
    );
}