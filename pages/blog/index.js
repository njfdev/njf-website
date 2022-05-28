import { H1 } from "components/CustomTags";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>njf - Blog</title>
      </Head>
      <div className="p-10">
          <H1>Blog</H1>
      </div>
    </>
  )
}

export default Home;