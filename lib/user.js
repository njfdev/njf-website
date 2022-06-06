export async function getUser(session) {
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

export async function getUserServer(session) {
    const res = await fetch(`${process.env.VERCEL_ENV === 'development' ? 'http://localhost:3000' : `https://${process.env.VERCEL_URL}`}/api/auth/get-user-data`, {
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