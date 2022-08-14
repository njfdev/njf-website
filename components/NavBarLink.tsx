import Link from "next/link";
import Icon from "@mdi/react";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config.js'
import { useEffect, useState } from "react";

enum ScreenSizes {
    small,
    large
}

type NavBarLinkProps = {
    href: string,
    icon?: string,
    children: React.ReactNode,
    containerClass?: string,
    textClass?: string,
    onClick?: any
}

function NavBarLink({ href, icon, children, containerClass, textClass, onClick }: NavBarLinkProps) {
    const [screenSize, setScreenSize]: [ScreenSizes, any] = useState(ScreenSizes.large);

    const fullConfig = resolveConfig(tailwindConfig);
    // @ts-ignore
    const mdPixels = parseInt(fullConfig.theme.screens.md.slice(0, -2));

    useEffect(() => {
        const updateScreenSize = () => {
            setScreenSize(window.innerWidth < mdPixels ? ScreenSizes.small : ScreenSizes.large);
        }
        
        updateScreenSize();
        window.addEventListener('resize', () => {
            updateScreenSize();
        })
    }, []);

    return (
        <div className={`flex select-none h-max ${containerClass}`} onClick={onClick}>
            <Link href={href}>
                <div className="flex gap-[1px] cursor-pointer">
                    {icon ? 
                        <Icon path={icon} size={
                            // @ts-ignore
                            screenSize == ScreenSizes.small ? 1.5 : 1.1} 
                            className="text-stone-800 dark:text-stone-300 my-auto" />
                        :
                        <></>
                    }
                    <div className="flex flex-col">
                        <div className="my-auto" />
                        <span className={`w-max text-neutral-800 dark:text-neutral-300 text-lg text-center align-middle font-semibold
                            ${textClass ||
                                // @ts-ignore
                                (screenSize == ScreenSizes.small ? '!text-3xl' : '')}`
                            }
                        >
                            {children}
                        </span>
                        <div className="my-auto" />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default NavBarLink;