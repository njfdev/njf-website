import Icon from "@mdi/react";

type IconButtonProps = {
    icon: string,
    onClick?: () => void,
    className?: string
}

function IconButton({ icon, onClick, className }: IconButtonProps) {
    return (
        <div className={`${className} flex select-none cursor-pointer`} onClick={onClick}>
            <Icon path={icon} size={1.5} className="text-stone-800 dark:text-stone-300 my-auto" />
        </div>
    )
}

export default IconButton;