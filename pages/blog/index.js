import { H1 } from "components/CustomTags";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Blog | njf</title>
        <meta name="description" content="Come to the blog of hobbyist developer Nicholas Fasching to learn more about computers and programming. Here you will find lots of educational content to get started in many topics such as developing web apps or desktop apps." />
      </Head>
      <div className="p-10">
          <H1>Blog</H1>
      </div>
    </>
  )
}

export default Home;