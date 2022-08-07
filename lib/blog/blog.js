import { supabase } from 'lib/supabase'

const BLOG_METADATA_TB = 'blog_metadata';
const BLOG_BODY_TB = 'blog_body';
const PROFILES_PRIVATE_TB = 'profiles_private';

export const getBlogMetadataOrderedByDate = async (client = supabase) => {
    const { data, error } = await client
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
    return await supabase
        .from(BLOG_METADATA_TB)
        .select()
        .eq('slug', slug)
        .single();
}

export const getBlogBySlug = async (slug) => {
    const { data: blog_metadata, error: error_m } = await getBlogMetadataFromSlug(slug);

    if (error_m) {
        console.log(error_m);
        return blog_metadata;
    }

    const { data: body, error } = await supabase
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

export const textToSlug = (text) => {
    return text.replace(/[^a-z0-9 ]/gi, '').split(' ').join('_').toLowerCase();
}

const generateUniqueName = () => {
    const { uniqueNamesGenerator, adjectives, starWars } = require('unique-names-generator');

    return uniqueNamesGenerator({
        dictionaries: [ adjectives, starWars],
        separator: ' ',
        length: 2,
        style: 'capital'
    });
}

export const uniqueBlogTitleGenerator = async () => {
    let title = generateUniqueName();
    let slug = textToSlug(title);

    while ((await getBlogMetadataFromSlug(slug)).status !== 406) {
        title = generateUniqueName()
        slug = textToSlug(title);
    }
    
    return { title, slug };
}

export const generateNewBlog = async () => {
    const { title, slug } = await uniqueBlogTitleGenerator();

    const { data, error: error_m } = await supabase
        .from(BLOG_METADATA_TB)
        .insert([
            {
                slug,
                title,
                description: "This is the default description."
            }
        ])

    if (error_m) {
        return { error: error_m };
    }

    const { error } = await supabase
        .from(BLOG_BODY_TB)
        .insert([
            {
                id: data[0].id,
                body: "This is the default body."
            }
        ])

    if (error) {
        return { error };
    }

    return { slug };
}

export const deleteBlog = async (slug) => {
    const { data: { id } } = await getBlogMetadataFromSlug(slug);

    {
        const { error } = await supabase
            .from(BLOG_BODY_TB)
            .delete()
            .match({ id });

        if (error) {
            return { error };
        }
    }

    {
        const { error } = await supabase
            .from(BLOG_METADATA_TB)
            .delete()
            .match({ id });

        if (error) {
            return { error };
        }
    }

    return {};
}