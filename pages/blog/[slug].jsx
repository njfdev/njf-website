import { getSupabase } from 'lib/supabase'
import { H1, H2, H3, P } from 'components/CustomTags'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import { getBlogBySlug, getBlogMetadataOrderedByDate } from 'lib/blog/blog';
import { useEffect, useState } from 'react'
import { isAuthenticated } from 'lib/helpers'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P
}

export default function Blog({ data }) {
    const [pro, setPro] = useState(false);

    useEffect(() => {
        (async () => {
            setPro(await isAuthenticated(true))
        })()
    }, []);

    return (
        <>
            <Head>
                <title>{data.title} | njf</title>
                <meta name="description" content={data.description} />
            </Head>

            <div className='flex flex-col gap-10 p-10 max-w-6xl mx-auto'>
                <div className='flex flex-col gap-1'>
                    <H1 className="!text-4xl pb-2">{data.title}</H1>
                    <H2 className="!text-neutral-300">{data.description}</H2>
                    <H3 className="!text-neutral-400">Published: {new Date(data.publish_date).toLocaleString()}</H3>
                    {data.update_date && <H3 className="!text-neutral-400">Updated: {new Date(data.update_date).toLocaleString()}</H3>}
                </div>
    
                <div>
                    {(!data.paid || pro) ?
                        <MDXRemote {...data.body} components={components} />
                        :
                        <H2>Please Buy a Subscription</H2>
                    }
                </div>
            </div>
        </>
    );
}

export async function getStaticProps(context) {
    const slug = context.params.slug

    const data = await getBlogBySlug(slug, true);

    if (!data) {
        return {
            notFound: true,
        }
    }

    data.body = await serialize(
        data.body, 
        {
            mdxOptions: {
                remarkPlugins: [
                    [
                        require('remark-prism'),
                        {

                        },
                    ],
                ],
            },
        },
    );

    return {
        props: { data },
        revalidate: 60,
    }
}

export async function getStaticPaths() {
    const { data, error } = await getBlogMetadataOrderedByDate('', true);

    if (error) {
        return {}
    }

    const paths = data.map((post) => ({
        params: { slug: post.slug },
    }))

    return {
        paths,
        fallback: 'blocking'
    };
}