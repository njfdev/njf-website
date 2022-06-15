import { getSession } from "next-auth/react";
import { getPageViewsToday, getPageViewsTodayByURL } from "lib/server/get_analytics";
import { DictToJSON, SortDictDescending } from 'lib/helpers';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const session = await getSession({ req });

        if (!session || !session.user.data.isAdmin) {
            res.status(401).json({ message: "Not Authorized" });
            return;
        }

        const page_views_today = await getPageViewsToday();
        const page_views_today_by_url = DictToJSON(SortDictDescending(await getPageViewsTodayByURL()));

        res.status(200).json({ page_views_today, page_views_today_by_url });
    } else {
        res.status(500).json({ message: "Route Not Vaild" });
    }
}