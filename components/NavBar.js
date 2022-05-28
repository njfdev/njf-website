import NLink from "components/NavBarLink";
import Link from "next/link";
import { mdiTextBox, mdiInformation, mdiEmail, mdiHome } from "@mdi/js";

function NavBar({}) {
    return (
        <>
            <div className="flex sticky top-0 left-0 w-screen py-3 px-6 bg-neutral-200 dark:bg-neutral-800">
                <div>
                    <NLink href="/">&lt;njf/&gt;</NLink>
                </div>

                <div className="m-auto" />

                <div className="flex gap-5">
                    <NLink href="/" icon={mdiHome}>Home</NLink>
                    <NLink href="/blog" icon={mdiTextBox}>Blog</NLink>
                    <NLink href="/about" icon={mdiInformation}>About</NLink>
                    <NLink href="/contact" icon={mdiEmail}>Contact</NLink>
                </div>
            </div>
        </>
    );
}

export default NavBar;