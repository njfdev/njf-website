import NLink from "components/NavBarLink";
import IconButton from "components/IconButton";
import { mdiTextBox, mdiInformation, mdiEmail, mdiHome, mdiMenu, mdiAccountBox, mdiClose, mdiViewDashboard } from "@mdi/js";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function NavBar({ server_session }) {
    const [navBarOpened, setNavBarOpened] = useState(false);
    const [session, setSession] = useState(server_session);
    const { data: client_session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            setSession(client_session);
        } else if (status === 'unauthenticated') {
            setSession(null);
        }
    }, [status, client_session]);

    // TODO: Optimize NavBar (Remove use of 2 similar menu bars for mobile & desktop)
    return (
        <>
            <div className="w-[100%] h-[60px] top-0 left-0" />
            <div className="flex justify-between fixed top-0 left-0 w-[100%] h-[60px] py-3 px-6 bg-neutral-200 dark:bg-neutral-800 z-[998]">
                <div className="flex justify-start basis-1/3">
                    <NLink href="/">njf</NLink>
                </div>

                <div className="hidden md:flex gap-5 justify-center basis-1/3">
                    <NLink href="/" icon={mdiHome}>Home</NLink>
                    <NLink href="/blog" icon={mdiTextBox}>Blog</NLink>
                    <NLink href="/about" icon={mdiInformation}>About</NLink>
                    <NLink href="/contact" icon={mdiEmail}>Contact</NLink>
                </div>

                <div className="flex justify-end relative basis-1/3">
                    <div className="hidden md:flex gap-5">
                        {status === 'authenticated' && session && session.user.data.isAdmin && <NLink href="/admin" icon={mdiViewDashboard}>Admin Dashboard</NLink>}
                        {status === 'authenticated' && session && <NLink href="/account" icon={mdiAccountBox}>{session.user.username}</NLink>}
                        {status === 'unauthenticated' && <NLink href="/auth/signin">Sign In</NLink>}
                        {status === 'unauthenticated' && <NLink href="/auth/signup" containerClass="border-4 rounded-xl px-2 border-green-600">Sign Up</NLink>}
                    </div>
                    <div className="flex justify-center md:hidden text-neutral-300">
                        {!navBarOpened && <IconButton icon={mdiMenu} onClick={() => { setNavBarOpened(true) }} /> }
                        {navBarOpened && <IconButton icon={mdiClose} onClick={() => { setNavBarOpened(false) }} /> }
                    </div>
                </div>
            </div>
            <div className={`flex md:!hidden top-0 left-0 z-[999] w-screen h-screen ${navBarOpened ? "fixed" : "hidden"}`}>
                <div className="bg-neutral-700 basis-2/3 flex flex-col gap-[5%]"
                    style={{ width: "70%", height: "100%" }}>
                    <div className="my-auto" />
                    <NLink href="/" icon={mdiHome} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Home</NLink>
                    <NLink href="/blog" icon={mdiTextBox} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Blog</NLink>
                    <NLink href="/about" icon={mdiInformation} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>About</NLink>
                    <NLink href="/contact" icon={mdiEmail} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Contact</NLink>
                    {status === 'authenticated' && session && session.user.data.isAdmin && <NLink href="/admin" icon={mdiViewDashboard} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Dashboard</NLink>}
                    {status === 'authenticated' && session && <NLink href="/account" icon={mdiAccountBox} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>{session.user.username}</NLink>}
                    {status === 'unauthenticated' && <NLink href="/auth/signin" containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Sign In</NLink>}
                    {status === 'unauthenticated' && <NLink href="/auth/signup" containerClass="h-max mx-auto border-8 rounded-xl px-4 py-2 border-green-600" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Sign Up</NLink>}
                    <div className="my-auto" />
                </div>
                <div className="basis-1/3" onClick={(e) => {e.preventDefault(); setNavBarOpened(false);}} />
            </div>
        </>
    );
}

export default NavBar;

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export async function getStaticProps(context) {
    return {
        props: {},
    }
}