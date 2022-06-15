import clientPromise from "lib/mongodb";
import { SortDictDescending, DictToJSON } from 'lib/helpers';

export async function getPageViewsToday() {
    const client = await clientPromise;
    const db = await client.db('main');
    const analytics = await db.collection('analytics');

    const utcString = new Date().toUTCString();
    const startOfDayFromEpoch = new Date(utcString).setUTCHours(0,0,0,0);
    const startOfDay = new Date(startOfDayFromEpoch);

    const query = {
        date: { $gte: `"${startOfDay}"` }
    };

    // Get the page_views for today
    const page_views_today_by_fingerprint = await analytics.distinct("data.page_views", query);

    let page_views_today = 0;
    for (const index in page_views_today_by_fingerprint) {
        for (const pathname in page_views_today_by_fingerprint[index]) {
            page_views_today += page_views_today_by_fingerprint[index][pathname];
        }
    }

    return page_views_today;
}

export async function getPageViewsTodayByURL() {
    const client = await clientPromise;
    const db = await client.db('main');
    const analytics = await db.collection('analytics');

    const utcString = new Date().toUTCString();
    const startOfDayFromEpoch = new Date(utcString).setUTCHours(0,0,0,0);
    const startOfDay = new Date(startOfDayFromEpoch);

    const query = {
        date: { $gte: `"${startOfDay}"` }
    };

    // Get the page_views for today
    const page_views_today_by_fingerprint = await analytics.distinct("data.page_views", query);

    let page_views_today = [];
    for (const index in page_views_today_by_fingerprint) {
        for (const pathname in page_views_today_by_fingerprint[index]) {
            if (!page_views_today[pathname]) {
                page_views_today[pathname] = page_views_today_by_fingerprint[index][pathname];
            } else {
                page_views_today[pathname] += page_views_today_by_fingerprint[index][pathname];
            }
        }
    }
    return page_views_today;
}