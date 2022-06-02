import Icon from "@mdi/react";

function NavBarIconButton({ icon, onClick }) {
    return (
        <div className="flex select-none cursor-pointer" onClick={onClick}>
            <Icon path={icon} size={1} className="text-stone-800 dark:text-stone-300 my-auto" />
        </div>
    )
}

export default NavBarIconButton;