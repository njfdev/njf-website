import { useAuth } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServerKey: string = process.env.SUPABASE_SECRET_KEY || '';

const getSupabase = async (getToken) => {
    if (!getToken) {
        getToken = useAuth().getToken;
    }

    const client = createClient(supabaseUrl, supabaseKey);

    const token = await getToken({ template: 'supabase' });
    
    client.auth.setAuth(token);

    return client;
}
const getServerSupabase = () => {
    return createClient(supabaseUrl, supabaseServerKey);
}

export { getSupabase, getServerSupabase };