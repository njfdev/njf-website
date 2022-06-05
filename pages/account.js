import { signOut, signIn, useSession, getSession } from 'next-auth/react';
import Button from 'components/StyledButton';
import { H1 } from '../components/CustomTags';
import Head from 'next/head';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
}

function Account() {
    const { data: session, status } = useSession();

    return (
        <>
            <Head>
                <title>Account | njf</title>
            </Head>
            <div className='p-10 w-screen'>
                {status === 'loading' &&
                    <H1 className="w-max mx-auto">Loading...</H1>
                }
                {status === 'authenticated' &&
                    <div className='flex'>
                        <div className='mx-auto'/>
                        <div className='flex flex-col'>
                            <H1 className="w-full p-2">Signed In As {session.user.email}</H1>
                            <br/>
                            <button className='bg-neutral-700 text-neutral-100 p-1 rounded-lg w-max mx-auto' onClick={() => signOut()}>Sign Out</button>
                        </div>
                        <div className='mx-auto'/>
                    </div>
                }
            </div>
        </>
    );
}

export default Account;