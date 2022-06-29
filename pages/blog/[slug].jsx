import { supabase } from 'lib/supabase'
import { H1, H2, H3, P } from 'components/CustomTags'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P
}

export default function Blog({ data }) {
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
                    <H3 className="!text-neutral-400">{new Date(data.publish_date).toLocaleDateString()}</H3>
                </div>

                <div>
                    <MDXRemote {...data.body} components={components} />
                </div>
            </div>
        </>
    );
}

export async function getStaticProps(context) {
    const slug = context.params.slug

    const { data, error } = await supabase
        .from('blog')
        .select()
        .eq('slug', slug)
        .single()

    console.log(data)

    if (error || !data) {
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
        props: { data }
    }
}

export async function getStaticPaths() {
    const { data, error } = await supabase
        .from('blog')
        .select('slug')

    if (error) throw error

    const paths = data.map((post) => ({
        params: { slug: post.slug },
    }))

    return {
        paths,
        fallback: 'blocking'
    };
}