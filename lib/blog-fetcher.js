import { supabase } from 'lib/supabase'

export const getBlogMetadataOrderedByDate = async () => {
    const { data, error } = await supabase
        .from('blog')
        .select('title, description, publish_date, thumbnail, slug')
        .order('publish_date', { ascending: false })

    if (error) {
        console.log(error);
        return null;
    }

    return data;
}