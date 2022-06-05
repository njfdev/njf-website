import { H1, Input, Label } from 'components/CustomTags';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();

        const status = await signIn('credentials', {
            redirect: false,
            callbackUrl: '/account',
            email: email,
            password: password,
        });
        console.log(status);
    };

    return (
        <>
            <div className='flex flex-col gap-10 p-10'>
                <H1 className="mx-auto w-max !text-4xl">Sign Up</H1>
                <form className='flex flex-col gap-2 mx-auto w-max' onSubmit={handleSignIn}>
                    <Label labelFor="email">Email: </Label>
                    <Input type="email" id="email" name="email" placeholder='example@mail.com' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    <Label labelFor="password">Password: </Label>
                    <Input type="password" id="password" name="password" placeholder='' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    <Input type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default SignIn;