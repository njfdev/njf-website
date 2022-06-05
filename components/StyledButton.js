import Link from "next/link";
import Icon from "@mdi/react";

function NavBarLink({ icon, children, containerClass, textClass, iconSize, onClick }) {
    return (
        <div className={`flex cursor-pointer select-none ${containerClass}`} onClick={onClick}>
            {icon ? <Icon path={icon} size={iconSize ? iconSize : 1} className="text-stone-800 dark:text-stone-300 my-auto" /> : <></>}
            <div className="flex flex-col">
                <div className="my-auto" />
                <span className={`text-neutral-800 dark:text-neutral-300 text-lg text-center align-middle ${textClass}`}
                    style={{ fontFamily: "'Fredoka One'" }}>
                    {children}
                </span>
                <div className="my-auto" />
            </div>
        </div>
    )
}

export default NavBarLink;