import { signOut, useSession } from 'next-auth/react';
import NLink from 'components/NavBarLink';
import { H1 } from '../components/CustomTags';


function Account() {
    const { data: session, status } = useSession();

    return (
        <div className='p-10'>
            {status === 'loading' &&
                <H1 className="w-max mx-auto">Loading...</H1>
            }
            {status === 'authenticated' &&
                <div className='flex'>
                    <div className='mx-auto'/>
                    <div className='flex flex-col'>
                        <H1 className="w-max">Signed In As {session.user.email}</H1>
                        <br/>
                        <button className='bg-neutral-700 text-neutral-100 p-1 rounded-lg w-max mx-auto' onClick={() => signOut()}>Sign Out</button>
                    </div>
                    <div className='mx-auto'/>
                </div>
            }
            {status === 'unauthenticated' &&
                <div className='flex'>
                    <div className='mx-auto'/>
                    <div className='flex flex-col'>
                        <H1 className="w-max mx-auto">Not Signed In</H1>
                        <br/>
                        <NLink href='/api/auth/signin' containerClass="mx-auto">Login</NLink>
                    </div>
                    <div className='mx-auto'/>
                </div>
            }
        </div>
    );
}

export default Account;