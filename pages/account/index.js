import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import EmailPassword, { signOut } from 'supertokens-auth-react/recipe/emailpassword';
import { getUserId, useSessionContext } from 'supertokens-auth-react/recipe/session'
import { getSupabase } from 'lib/supabase';
import { H1, H2 } from 'components/CustomTags';
import { deleteUser } from "supertokens-node";
import { Input } from 'components/CustomTags'
import { toast } from "react-toastify";

export default function Account() {
    return (
        <>
            <Head>
                <title>Account | njf</title>
            </Head>

            <EmailPassword.EmailPasswordAuth>
                <ProtectedPage />
            </EmailPassword.EmailPasswordAuth>
        </>
    );
}

function ProtectedPage() {
    // retrieve the authenticated user's accessTokenPayload and userId from the sessionContext
    const session = useSessionContext();

    const [userEmail, setEmail] = useState('');

    useEffect(() => {
        async function getUserEmail() {
            if (session.loading) {
                return;
            }

            // retrieve the supabase client who's JWT contains users userId, this will be
            // used by supabase to check that the user can only access table entries which contain their own userId
            const supabase = await getSupabase();

            // retrieve the user's name from the users table whose email matches the email in the JWT
            const { data } = await supabase
                .from('users')
                .select()
                .eq('id', session.userId)
                .single();

            setEmail(data?.email);
        }

        getUserEmail();
    }, [session]);

    if (session.loading) {
        return null;
    }

    return (
        <div>
            <H1>You are authenticated with SuperTokens!</H1>
            <H2>User ID: {session.userId}</H2>
            <H2>Email: {userEmail}</H2>

            <button onClick={async () => {await signOut();useRouter().reload()}}>Sign Out</button>

            <H2>Delete Account</H2>
            <form onSubmit={async (e) => {
                e.preventDefault();

                const userId = await getUserId();

                await signOut();

                const res = await fetch('/api/delete-user', {
                    method: 'POST',
                    body: JSON.stringify({ userId })
                })

                if (res.status === 401) {
                    toast.success('Successfully Deleted Your Account');
                    useRouter().push('/auth')
                } else {
                    toast.error((await res.json()).error)
                }
            }}>
                <Input type="submit" value="Delete" />
            </form>
        </div>
    )
}