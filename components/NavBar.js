import NLink from "components/NavBarLink";
import IconButton from "components/IconButton";
import Link from "next/link";
import { mdiTextBox, mdiInformation, mdiEmail, mdiHome, mdiMenu, mdiAccountBox } from "@mdi/js";
import { useState, useRef, useEffect } from "react";
import { P } from "./CustomTags";
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/react'
import getUser from "lib/user";

function NavBar({}) {
    const [height, setHeight] = useState(0);
    const [navBarOpened, setNavBarOpened] = useState(false);
    const [user, setUser] = useState(null);
    const ref = useRef(null);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, []);

    useEffect(() => {
        if (status === 'authenticated') {
            const defineUser = async () => {
                const user_ = await getUser(session);
                setUser(user_);
            }
            defineUser();
        } else {
            setUser(null);
        }
    }, [router.route]);

    return (
        <>
            <div className={`w-[100%] top-0 left-0`} style={{ height: `${height}px` }} />
            <div className="flex justify-between fixed top-0 left-0 w-[100%] py-3 px-6 bg-neutral-200 dark:bg-neutral-800 z-[998]"
                ref={ref}>
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
                    <div className="hidden md:flex gap-5 w-max">
                        {status === 'authenticated' && <NLink href="/account" icon={mdiAccountBox}>{user ? user.username : "Account"}</NLink>}
                        {status === 'unauthenticated' && <NLink href="/login" icon={mdiAccountBox}>Login</NLink>}
                        {status === 'unauthenticated' && <NLink href="/signup" containerClass="bg-green-600 px-2 rounded-xl">Sign Up</NLink>}
                    </div>

                    <div className="block md:hidden text-neutral-300">
                        <IconButton icon={mdiMenu} onClick={() => { setNavBarOpened(~navBarOpened) }} />
                    </div>
                </div>
            </div>
            <div className={`md:!hidden bg-neutral-700 fixed top-0 left-0 z-[999] ${navBarOpened ? "flex flex-col gap-[5%]" : "hidden"}`}
                style={{ width: "70%", height: "100%" }}>
                <div className="my-auto" />
                <NLink href="/" icon={mdiHome} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Home</NLink>
                <NLink href="/blog" icon={mdiTextBox} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Blog</NLink>
                <NLink href="/about" icon={mdiInformation} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>About</NLink>
                <NLink href="/contact" icon={mdiEmail} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Contact</NLink>
                {status === 'authenticated' && <NLink href="/account" icon={mdiAccountBox} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>{user ? user.username : "Account"}</NLink>}
                {status === 'unauthenticated' && <NLink href="/login" icon={mdiAccountBox} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Login</NLink>}
                {status === 'unauthenticated' && <NLink href="/signup" containerClass="bg-green-600 px-4 py-1 rounded-xl h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Sign Up</NLink>}
                <div className="my-auto" />
            </div>
        </>
    );
}

export default NavBar;
