import { Button, H1, H2, Input } from "components/CustomTags";
import { useRouter } from "next/router";

export default function Success() {
    const sessionId = useRouter().query.sessionId;
    return (
        <>
            <H1>Subscription Started</H1>
            <H2>You have successfully signed up!</H2>

            <form action="/api/create-portal-session" method='POST'>
                <Input
                    type="hidden"
                    id="sessionId"
                    name="sessionId"
                    value={sessionId}
                    />
                <Input type="submit" value="Manage your billing information"/>
            </form>
        </>
    )
}