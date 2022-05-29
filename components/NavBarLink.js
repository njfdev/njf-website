import Link from "next/link";
import Icon from "@mdi/react";

function NavBarLink({ href, icon, children }) {
    return (
        <div className="flex select-none">
            <Link href={href}>
                <div className="flex cursor-pointer">
                    {icon ? <Icon path={icon} size={1} className="text-stone-800 dark:text-stone-300 my-auto" /> : <></>}
                    <span className="text-neutral-800 dark:text-neutral-300 text-lg"
                        style={{ fontFamily: "'Fredoka One'" }}>
                        {children}
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default NavBarLink;