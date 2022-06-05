export default async function getUser(session) {
    const res = await fetch('/api/auth/get-user-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; odata=verbose',

        },
        body: JSON.stringify({
            session: session
        }),
    });

    const data = await res.json();

    if (data.user) {
        return data.user;
    } else {
        return null;
    }
}