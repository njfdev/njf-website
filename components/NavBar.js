import NLink from "components/NavBarLink";
import IconButton from "components/IconButton";
import Link from "next/link";
import { mdiTextBox, mdiInformation, mdiEmail, mdiHome, mdiMenu, mdiAccountBox } from "@mdi/js";
import { useState, useRef, useEffect } from "react";
import { P } from "./CustomTags";
import { useRouter } from 'next/router'

function NavBar({}) {
    const [height, setHeight] = useState(0);
    const [navBarOpened, setNavBarOpened] = useState(false);
    const ref = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, []);

    return (
        <>
            <div className={`w-[100%] top-0 left-0`} style={{ height: `${height}px` }} />
            <div className="flex fixed top-0 left-0 w-[100%] py-3 px-6 bg-neutral-200 dark:bg-neutral-800 z-[998]"
                ref={ref}>
                <div className="mx-1">
                    <NLink href="/">njf</NLink>
                </div>

                <div className="m-auto" />

                <div className="relative">
                    <div className="hidden md:flex gap-5">
                        <NLink href="/" icon={mdiHome}>Home</NLink>
                        <NLink href="/blog" icon={mdiTextBox}>Blog</NLink>
                        <NLink href="/about" icon={mdiInformation}>About</NLink>
                        <NLink href="/contact" icon={mdiEmail}>Contact</NLink>
                        <NLink href="/account" icon={mdiAccountBox}>Account</NLink>
                    </div>

                    <div className="block md:hidden text-neutral-300">
                        <IconButton icon={mdiMenu} onClick={() => { setNavBarOpened(~navBarOpened) }} />
                    </div>
                </div>
            </div>
            <div className={`md:!hidden bg-neutral-700 absolute top-0 left-0 z-[999] ${navBarOpened ? "flex flex-col gap-[5%]" : "hidden"}`}
                style={{ width: "70%", height: "100%" }}>
                <div className="my-auto" />
                <NLink href="/" icon={mdiHome} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Home</NLink>
                <NLink href="/blog" icon={mdiTextBox} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Blog</NLink>
                <NLink href="/about" icon={mdiInformation} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>About</NLink>
                <NLink href="/contact" icon={mdiEmail} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Contact</NLink>
                <NLink href="/account" icon={mdiAccountBox} containerClass="h-max mx-auto" textClass="!text-4xl" iconSize={2} onClick={() => { setNavBarOpened(false); }}>Account</NLink>
                <div className="my-auto" />
            </div>
        </>
    );
}

export default NavBar;