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

export const getBlogBySlug = async (slug) => {
    const { data, error } = await supabase
        .from('blog')
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
    const { data, error } = await supabase
        .from('blog')
        .update(updates)
        .eq('slug', slug)
    
    if (error) throw error
    return false
}