import { H1, Input, Label } from 'components/CustomTags';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react';

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; odata=verbose',

            },
            body: JSON.stringify({
                fname: firstName,
                lname: lastName,
                email: email,
                username: username,
                password: password,
            }),
        });

        const data = await res.json();
        
        if (res.status == 201) {
            toast.success(data.message);
            const status = await signIn('credentials', {
                redirect: false,
                callbackUrl: '/account',
                email: email,
                password: password,
            });
            
            if (!status.error) {
                router.push("/account");
            } else {
                toast.error(`Could Not Login To Newly Created Account: ${status.error}`);
                router.push("/login")
            }
        } else if (res.status == 201) {
            toast.error(data.message);
        } else {
            toast.error("An Unknown Error Has Occurred")
        }
    };

    return (
        <>
            <div className='flex flex-col gap-10 p-10'>
                <H1 className="mx-auto w-max !text-4xl">Sign Up</H1>
                <form className='flex flex-col gap-2 mx-auto w-max' onSubmit={handleSignUp}>
                    <Label labelFor="fname">First Name: </Label>
                    <Input type="text" id="fname" name="fname" placeholder='John' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
                    <Label labelFor="lname">Last Name: </Label>
                    <Input type="text" id="lname" name="lname" placeholder='Doe' value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
                    <Label labelFor="email">Email: </Label>
                    <Input type="email" id="email" name="email" placeholder='example@gmail.com' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    <Label labelFor="username">Username: </Label>
                    <Input type="username" id="username" name="text" placeholder='cool_person81' value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    <Label labelFor="password">Password: </Label>
                    <Input type="password" id="password" name="password" placeholder='' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    <Input type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default SignUp;