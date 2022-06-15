import Head from "next/head";
import { H1, H2, H3, Li, Ul } from "components/CustomTags";
import { getPageViewsToday, getPageViewsTodayByURL } from "lib/server/get_analytics";
import IconButton from "components/IconButton";
import { mdiRefresh } from '@mdi/js';
import { useState } from "react";
import { JSONToDict, DictToJSON, SortDictDescending } from 'lib/helpers';

export async function getServerSideProps(context) {
    return {
        props: {
            page_views_today_server: await getPageViewsToday(),
            page_views_today_by_url_server: DictToJSON(SortDictDescending(await getPageViewsTodayByURL())),
        },
    };
}

export default function Analytics({ page_views_today_server, page_views_today_by_url_server }) {
    const [page_views_today, setPageViewsToday] = useState(page_views_today_server);
    const [page_views_today_by_url, setPageViewsTodayByURL] = useState(page_views_today_by_url_server);
    
    const onRefresh = async () => {
        const res = await fetch('/api/get_pageviews_today');
        const data = await res.json();

        setPageViewsToday(data.page_views_today);
        setPageViewsTodayByURL(JSONToDict(data.page_views_today_by_url));
    };

    return (
        <>
            <Head>
                <title>Analytics | njf</title>
            </Head>
            <div className="flex flex-col w-[100%] p-10 items-center">
                <H1 className="!text-6xl">Analytics</H1>
                <br/>
                <IconButton icon={mdiRefresh} onClick={onRefresh} />
                <br/>
                <H2>Today&apos;s Page Views: {page_views_today}</H2>
                <Ul>
                    {Object.entries(page_views_today_by_url).map((url_page_views) => (
                        <Li key={url_page_views}><b>{url_page_views[0]}</b>: {url_page_views[1]}</Li>
                    ))}
                </Ul>
            </div>
        </>
    )
}