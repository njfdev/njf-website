import { H1 } from "components/CustomTags";
import Head from "next/head";
import { getBlogMetadataOrderedByDate } from "lib/blog/blog";
import BlogPreview from "components/blog/BlogPreview";
import { useEffect } from "react";
import {supabase} from 'lib/supabase'
import { supabaseServerClient, withPageAuth } from "@supabase/auth-helpers-nextjs";

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export const getServerSideProps = withPageAuth({
  authRequired: false,
  async getServerSideProps(context) {
    const client = await supabaseServerClient(context);

    let blogs = [];

    if (client.type === 'cookie_not_found') {
      blogs = await supabase
        .from('blog_metadata')
        .select()
        .where('paid = false');
    } else {
      blogs = await getBlogMetadataOrderedByDate(client)
    }

    return {
        props: { blogs },
    }
  }
});

function Home({ blogs }) {
  useEffect(() => {
    const test = async () => {
      console.log(await supabase.from('blog_metadata').select())
    }

    test()
  }, [])

  return (
    <>
      <Head>
        <title>Blog | njf</title>
        <meta name="description" content="Come to the blog of hobbyist developer Nicholas Fasching to learn more about computers and programming. Here you will find lots of educational content to get started in many topics such as developing web apps or desktop apps." />
      </Head>
      <div className="p-10 h-full">
          <H1>Blogs</H1>
          <ul className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,0.5fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,0.25fr))] auto-rows-[350px] md:auto-rows-[450px]
            w-[100%]
            pt-5">
            {
              blogs.map((blog, index) => {
                return <BlogPreview 
                  link={`/blog/${blog.slug}`}
                  key={index} 
                  title={blog.title} 
                  description={blog.description} 
                  publish_date={blog.publish_date} 
                  thumbnail={blog.thumbnail}
                  aboveFold={index < 8}
                  paid={blog.paid}
                  published={blog.published} />
              })
            }
          </ul>
      </div>
    </>
  )
}

export default Home;