import Head from "next/head"
import { supabase } from 'lib/supabase'
import BackendBlogPreview from "components/BackendBlogPreview";

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

const getBlogMetadataOrderedByDate = async () => {
    const { data, error } = await supabase
        .from('blog')
        .select('title, description, publish_date')
        .order('publish_date', { ascending: false })

    if (error) {
        console.log(error);
        return null;
    }

    return data;
}