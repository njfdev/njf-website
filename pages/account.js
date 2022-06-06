import { signOut, useSession, getSession } from 'next-auth/react';
import Button from 'components/StyledButton';
import { H1, H2 } from '../components/CustomTags';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserServer } from 'lib/user';
import { toast } from 'react-toastify';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: `/login?error=no-session&redirect=${context.req.url}`,
                permanent: false,
            },
        };
    }
    const user = await getUserServer(session);
    return {
        props: { session, user },
    };
}

function Account({ session, user }) {
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            toast.error("Could Not Find Your Account");
            signOut();
            router.push("/login");
        }
    }, [])

    return (
        <>
            <Head>
                <title>Account | njf</title>
            </Head>
            <div className='p-10 w-screen'>
                <div className='flex'>
                    <div className='mx-auto'/>
                    <div className='flex flex-col'>
                        <H1 className="w-full p-2 text-center">Welcome {user.first_name} {user.last_name}</H1>
                        <H2 className="w-full p-2 text-center">Username: {user.username}</H2>
                        <H2 className="w-full p-2 text-center">Email: {user.email}</H2>
                        <br/>
                        <button className='bg-neutral-700 text-neutral-100 p-1 rounded-lg w-max mx-auto' onClick={() => signOut()}>Sign Out</button>
                    </div>
                    <div className='mx-auto'/>
                </div>
            </div>
        </>
    );
}

export default Account;