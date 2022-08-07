import Head from "next/head";
import { supabase } from 'lib/supabase'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BlogPreview from "components/blog/BlogPreview";
import { getBlogMetadataOrderedByDate, getBlogBySlug, updateBlog, textToSlug, uniqueBlogTitleGenerator, generateNewBlog, deleteBlog } from "lib/blog/blog";
import { H1, H2, H3, P, Input, Label, TextArea } from 'components/CustomTags'
import lodash from 'lodash/lang'
import Image from "next/image";
import { isValidUrl, difference } from "lib/helpers";
import { toast } from "react-toastify";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Button } from 'components/CustomTags'
import { Blog } from "lib/blog/types";

const rehypePrism = require("@mapbox/rehype-prism");

const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    p: P
  }


export default function Admin() {
    const router = useRouter()
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [inspectedBlogSlug, setInspectedBlogSlug] = useState<String>(null);
    const [blog, setBlog] = useState<Blog>(null);
    const [editedBlog, setEditedBlog] = useState<Blog>(null);
    const [blogMdPreview, setBlogMdPreview] = useState(null);

    const fetchAllBlogs = async () => {
        setBlogs(await getBlogMetadataOrderedByDate())
    }

    const fetchBlogBySlug = async () => {
        const blogData = await getBlogBySlug(inspectedBlogSlug);
        setBlog(blogData)
        setEditedBlog(blogData)
    }

    const runUpdateBlog = async (e) => {
        e.preventDefault();

        const updatedBlog = difference({ ...editedBlog }, blog)

        // RULES: Publish date is updated when published and if it doesn't already exist
        // Update date is only update when not previously published and only if blog content changes
        const now = new Date();
        const date = editedBlog.published ?
            !blog.publish_date ?
                { publish_date: now } 
                :
                blog.published === false && updatedBlog.hasOwnProperty('published') && Object.keys(updatedBlog).length <= 1 ?
                    {}
                    :
                    { update_date: now }
            :
            blog.publish_date ?
                blog.published === true && updatedBlog.hasOwnProperty('published') && Object.keys(updatedBlog).length <= 1 ?
                    {}
                    :
                    { update_date: now }
                :
                {};

        const error = await updateBlog(blog.slug, { ...updatedBlog, ...date });

        if (error) {
            toast.error(error);
        } else {
            fetchBlogBySlug();
            toast.success('Blog Updated Successfully');
        }
    }

    useEffect(() => {
        fetchAllBlogs();
    }, [blog])

    useEffect(() => {
        if (inspectedBlogSlug) {
            fetchBlogBySlug()
        } else {
            setBlog(null)
            setEditedBlog(null)
        }
    }, [inspectedBlogSlug])

    const updateMdxPreview = async () => {
        try {
            const serializedBlog = await serialize(
                editedBlog ? editedBlog.body : blog ? blog.body : '', 
                {
                    mdxOptions: {
                        rehypePlugins: [
                            [
                                rehypePrism,
                            ],
                        ],
                    },
                },
            );

            setBlogMdPreview(serializedBlog);
        } catch {}
    }

    const updateEditedBlog = async (field, value) => {
        const blogData = { ...editedBlog }
    
        blogData[field] = value
    
        setEditedBlog(blogData)
    }

    useEffect(() => {
        updateMdxPreview();
    }, [editedBlog, blog])

    const newBlog = async () => {
        const { slug, error } = await generateNewBlog();

        if (error) {
            throw error;
        }

        setInspectedBlogSlug(slug);
    }

    const runDeleteRoutine = async (e) => {
        e.preventDefault();

        const { error } = await deleteBlog(inspectedBlogSlug);

        if (!error) {
            toast.success("Blog has been deleted");
        } else {
            toast.error(String(error));
        }

        setInspectedBlogSlug(null);
    }

    return (
        <>
            <Head>
                <title>Admin Dashboard | njf</title>
            </Head>

            <div className="overflow-y-hidden flex gap-10 p-10 absolute top-[60px] left-0 w-[100%] h-[calc(100vh_-_60px)]">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col align-middle gap-5
                        w-[300px]
                        h-[100%]
                        p-5
                        rounded-2xl border-2 border-neutral-700">
                    <Button className='font-bold text-xl w-full min-h-[40px] m-0' onClick={newBlog}>New Blog</Button>
                    <ul className="grid gap-5 grid-cols-1 auto-rows-[300px]">
                        {
                            blogs.map((blog, index) => {
                                return <BlogPreview 
                                onClick={() => {setInspectedBlogSlug(blog.slug)}}
                                key={index} 
                                title={blog.title} 
                                description={blog.description} 
                                publish_date={blog.publish_date} 
                                thumbnail={blog.thumbnail}
                                aboveFold={index < 8}
                                published={blog.published}
                                paid={blog.paid} />
                            })
                        }
                    </ul>
                </div>
                {blog &&
                    <div className="grow overflow-y-auto pr-10 max-h-[100%]">
                        <form onSubmit={(e) => runUpdateBlog(e)}>
                            <Input 
                                value={editedBlog.title} 
                                onChange={(e) => {updateEditedBlog('title', e.target.value)}}
                                className='!bg-transparent focus:border-neutral-700 text-4xl font-bold' />
                            <H2>Published: {editedBlog.publish_date ? new Date(editedBlog.publish_date).toLocaleString(): 'N/A'}</H2>
                            <H2>Updated: {editedBlog.update_date ? new Date(editedBlog.update_date).toLocaleString() : 'N/A'}</H2>
                            <br />
                            <Label labelFor='slug' className='font-semibold'>Slug</Label>
                            <Input 
                                value={editedBlog.slug} 
                                id='slug'
                                onChange={(e) => {updateEditedBlog('slug', e.target.value)}}
                                className='text-xl block w-[300px]' />
                            <br />
                            <Label labelFor='thumbnail' className='font-semibold'>Thumbnail</Label>
                            <Input 
                                value={editedBlog.thumbnail || ''} 
                                id='thumbnail'
                                onChange={(e) => {updateEditedBlog('thumbnail', e.target.value)}}
                                className='text-xl block w-full' />
                            {editedBlog.thumbnail && isValidUrl(editedBlog.thumbnail) && 
                                <div className="relative w-[300px] h-[175px] mt-2">
                                    <Image src={editedBlog.thumbnail} layout='fill' objectFit="cover" />
                                </div>
                            }
                            <br />
                            <Label labelFor='desc' className='font-semibold'>Description</Label>
                            <TextArea
                                value={editedBlog.description} 
                                id="desc"
                                onChange={(e) => {updateEditedBlog('description', e.target.value)}}
                                className='block text-xl p-2 w-[750px] max-h-[100px] min-h-[100px]' />
                            <br />
                            <Label labelFor='body' className='font-semibold'>Body</Label>
                            <div className="flex w-full gap-10 h-max max-h-[500px] min-h-[500px]">
                                <TextArea
                                    value={editedBlog.body} 
                                    id="body"
                                    onChange={(e) => {updateEditedBlog('body', e.target.value)}}
                                    className='block text-xl p-2 grow' />
                                <div className="flex flex-col grow">
                                    <H2>Blog Preview</H2>
                                    <div className="border-neutral-700 border-4 rounded-lg py-2 px-4 overflow-auto">
                                        {blogMdPreview && <MDXRemote {...blogMdPreview} components={components} />}
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <Label>Paid: </Label>
                            <Input type='checkbox' checked={editedBlog.paid} onChange={(e) => {updateEditedBlog('paid', !editedBlog.paid)}} />
                            <br/>
                            <Label>Publish: </Label>
                            <Input type='checkbox' checked={editedBlog.published} onChange={(e) => {updateEditedBlog('published', !editedBlog.published)}} />
                            <br/>
                            <Input type='submit' value='Save' className='text-2xl px-2 bg-green-600 cursor-pointer disabled:cursor-default disabled:opacity-50' disabled={lodash.isEqual(blog, editedBlog)} />
                            <Button className='font-bold text-xl float-right h-[40px] bg-red-600' onClick={runDeleteRoutine}>Delete</Button>
                        </form>
                    </div>
                    ||
                    <div className="flex flex-col justify-center grow">
                        <H1 className='mx-auto w-max'>Select Blog</H1>
                    </div>
                }
            </div>
        </>
    );
}

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export const getServerSideProps = () => {

    // Is admin
    return {
        props: {},
    }
}