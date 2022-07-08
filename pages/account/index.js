import { useUser } from "@supabase/auth-helpers-react";
import { Button } from "@supabase/ui";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

export default function Account() {
    const router = useRouter();
    const { user, error } = useUser();

    return (
        <>
            <Head>
                <title>Account | njf</title>
            </Head>
            <div className="p-5 md:p-10">
                <Button onClick={() => {supabaseClient.auth.signOut()}}>Sign Out</Button>
            </div>
        </>
    );
}