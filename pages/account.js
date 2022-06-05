import { signOut, useSession, getSession } from 'next-auth/react';
import Button from 'components/StyledButton';
import { H1, H2 } from '../components/CustomTags';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getUser from 'lib/user';

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
    const [user, setUser] = useState();
    const router = useRouter();
    
    useEffect(() => {
        if (status === 'authenticated') {
            const defineUser = async () => {
                const user_ = await getUser(session);
                setUser(user_);
            }
            defineUser();
        } else {
            setUser(null);
        }
    }, [router.route]);

    return (
        <>
            <Head>
                <title>Account | njf</title>
            </Head>
            <div className='p-10 w-screen'>
                {status === 'loading' &&
                    <H1 className="w-max mx-auto">Loading...</H1>
                }
                {status === 'authenticated' && user &&
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
                }
            </div>
        </>
    );
}

export default Account;