import Icon from "@mdi/react";

type IconButtonProps = {
    icon: string,
    onClick: () => void
}

function IconButton({ icon, onClick }) {
    return (
        <div className="flex select-none cursor-pointer" onClick={onClick}>
            <Icon path={icon} size={1.5} className="text-stone-800 dark:text-stone-300 my-auto" />
        </div>
    )
}

export default IconButton;