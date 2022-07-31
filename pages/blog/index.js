import { H1 } from "components/CustomTags";
import Head from "next/head";
import { getBlogMetadataOrderedByDate } from "lib/blog";
import BlogPreview from "components/blog/BlogPreview";

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export async function getStaticProps(context) {
  const blogs = await getBlogMetadataOrderedByDate()

  return {
      props: { blogs },
  }
}

function Home({ blogs }) {
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
                  paid={blog.paid} />
              })
            }
          </ul>
      </div>
    </>
  )
}

export default Home;