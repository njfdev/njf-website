import NLink from "components/NavBarLink";
import Link from "next/link";
import { mdiTextBox, mdiInformation, mdiEmail, mdiHome } from "@mdi/js";
import { useState, useRef, useEffect } from "react";
import { P } from "./CustomTags";
import { useRouter } from 'next/router'

function NavBar({}) {
    const [height, setHeight] = useState(0);
    const [nvaBarOpened, setNavBarOpened] = useState(false);
    const ref = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, []);

    return (
        <>
            <div className={`w-[100%] top-0 left-0`} style={{ height: `${height}px` }} />
            <div className="flex fixed top-0 left-0 w-[100%] py-3 px-6 bg-neutral-200 dark:bg-neutral-800 z-[999]"
                ref={ref}>
                <div>
                    <NLink href="/">&lt;njf/&gt;</NLink>
                </div>

                <div className="m-auto" />

                <div className="relative">
                    <div className="hidden md:flex gap-5">
                        <NLink href="/" icon={mdiHome}>Home</NLink>
                        <NLink href="/blog" icon={mdiTextBox}>Blog</NLink>
                        <NLink href="/about" icon={mdiInformation}>About</NLink>
                        <NLink href="/contact" icon={mdiEmail}>Contact</NLink>
                    </div>

                    <div className="block md:hidden text-neutral-300">
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;