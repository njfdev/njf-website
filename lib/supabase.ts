import { createClient } from '@supabase/supabase-js';
import { getAccessTokenPayloadSecurely } from 'supertokens-auth-react/recipe/session';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServerKey: string = process.env.SUPABASE_SECRET_KEY || '';

const getSupabase = async (access_token?: string) => {
    const supabase = createClient(
        supabaseUrl,
        supabaseKey
    )

    access_token = access_token ?? (await getAccessTokenPayloadSecurely()).supabase_token;

    supabase.auth.session = () => ({
        access_token,
        token_type: '',
        user: null
    })

    return supabase
}

const getServerSupabase = () => {
    return createClient(
        supabaseUrl,
        supabaseServerKey
    );
}

export { getSupabase, getServerSupabase };