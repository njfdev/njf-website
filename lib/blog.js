import { supabase } from 'lib/supabase'

const BLOG_METADATA_TB = 'blog_metadata';
const BLOG_BODY_TB = 'blog_body';
const PROFILES_PRIVATE_TB = 'profiles_private';

export const getBlogMetadataOrderedByDate = async () => {
    const { data, error } = await supabase
        .from(BLOG_METADATA_TB)
        .select('*')
        .order('publish_date', { ascending: false })

    if (error) {
        console.log(error);
        return null;
    }

    return data;
}

export const getBlogMetadataFromSlug = async (slug) => {
    const { data, error } = await supabase
        .from(BLOG_METADATA_TB)
        .select()
        .eq('slug', slug)
        .single();
    
    if (error) {
        throw error;
    }

    return data;
}

export const getBlogBySlug = async (slug) => {
    const blog_metadata = await getBlogMetadataFromSlug(slug);

    const { body, error } = await supabase
        .from(BLOG_BODY_TB)
        .select('body')
        .eq('id', blog_metadata.id)
        .single();

    if (error) {
        console.log(error);
        return blog_metadata;
    }

    return { ...body, ...blog_metadata };
}

export const updateBlog = async (slug, updates) => {
    if (updates.body) {
        const { id } = await getBlogMetadataFromSlug(slug);

        const { error, statusText } = await supabase
            .from(BLOG_BODY_TB)
            .update({ body: updates.body })
            .match({ id })

        if (error) {
            return statusText;
        }

        delete updates['body']
    }

    const { error, statusText } = await supabase
        .from(BLOG_METADATA_TB)
        .update(updates)
        .match({ slug })

    if (error) { return statusText }
    return false
}