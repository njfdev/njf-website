import Head from "next/head"
import BackendBlogPreview from "components/BackendBlogPreview";
import { getBlogMetadataOrderedByDate } from "lib/blog-fetcher";

export default function BlogManagement() {
    getBlogMetadataOrderedByDate()
    return (
        <>
            <Head>
                <title>Manage Blogs | njf</title>
            </Head>

            <div className="flex p-10 absolute top-[60px] left-0 w-[100%] h-[calc(100% - 60px)]">
                <div className="w-[300px] rounded-2xl border-2 p-5 border-neutral-700">
                    <BackendBlogPreview />
                </div>
            </div>
        </>
    );
}

