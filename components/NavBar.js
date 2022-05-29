import NLink from "components/NavBarLink";
import Link from "next/link";
import { mdiTextBox, mdiInformation, mdiEmail, mdiHome } from "@mdi/js";
import { useState, useRef, useEffect } from "react";
import { P } from "./CustomTags";

function NavBar({}) {
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

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
                        <svg width={"25"} height={"25"} begin="click">
                            <rect x="0" y="0" rx="3" ry="3" width="25" height="5" fill="currentColor"/>
                            <rect x="0" y="10" rx="3" ry="3" width="25" height="5" fill="currentColor">
                                <animate attributeName="transform" values="rotate(0 0 0); rotate(0 0 0); rotate(45 12.5 12.5)" dur="1s" 
                                    repeatCount="indefinite" />
                            </rect>
                            <rect x="0" y="20" rx="3" ry="3" width="25" height="5" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;