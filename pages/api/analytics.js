import clientPromise from 'lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (req.body.password === process.env.SERVER_PASSWORD) {
            const client = await clientPromise;
            const db = await client.db('main');
            const analytics = await db.collection('analytics');

            const utcString = new Date().toUTCString();
            const startOfDayFromEpoch = new Date(utcString).setUTCHours(0,0,0,0);
            const startOfDay = new Date(startOfDayFromEpoch);

            const query = {
                date: { $gte: `"${startOfDay}"` }, 
                user_fingerprint: req.body.user_fingerprint
            };
            // Get the analytic data for this fingerprint for today
            const fingerprintedUser = await analytics.findOne(query);
            
            if (!fingerprintedUser) {
                await analytics.insertOne({
                    user_fingerprint: req.body.user_fingerprint,
                    date: new Date().toISOString(),
                    data: {
                        page_views: {}
                    }
                });
            }

            const valueName = `"data.page_views.${req.body.pathname}"`;
            // Increment page_view for path
            analytics.updateOne(
                query,
                JSON.parse(`{ "$inc": { ${valueName}: 1 } }`)
            );
            
            res.status(200).json({ message: 'Success' })
        } else {
            res.status(401).json({ message: 'Not Authorized' });
        }
    } else {
        res.status(500).json({ message: 'Route Not Vaild' });
    }
}