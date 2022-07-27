import { supabase } from 'lib/supabase'

export const getBlogMetadataOrderedByDate = async () => {
    const { data, error } = await supabase
        .from('blogs')
        .select('title, description, publish_date, thumbnail, slug, published')
        .order('publish_date', { ascending: false })

    if (error) {
        console.log(error);
        return null;
    }

    return data;
}

export const getBlogBySlug = async (slug) => {
    const { data, error } = await supabase
        .from('blogs')
        .select()
        .eq('slug', slug)
        .single()

    if (error) {
        console.log(error);
        return null;
    }

    return data;
}

export const updateBlog = async (slug, updates) => {
    const { error, statusText } = await supabase
        .from('blogs')
        .update(updates)
        .match({ slug })

    if (error) { return statusText }
    return false
}