import NLink from "components/NavBarLink";
import IconButton from "components/IconButton";
import { mdiTextBox, mdiInformation, mdiEmail, mdiHome, mdiMenu, mdiAccountBox, mdiClose, mdiViewDashboard } from "@mdi/js";
import { useState, useEffect } from "react";

export default function NavBar() {
    const [navBarOpened, setNavBarOpened] = useState(false);
    const [username, setUsername] = useState('account');
    const [pageHeight, setPageHeight] = useState(500);

    const toggleNavBar = (): void => {
        setNavBarOpened(!navBarOpened);
    };

    useEffect(() => {
        const updatePageHeight = () => {
            setPageHeight(window.innerHeight);
        }
        
        updatePageHeight();
        window.addEventListener('resize', () => {
            updatePageHeight();
        })
    }, [])

    useEffect(() => {
        const preventDefault = (e) => {
            e.preventDefault();
        }

        if (navBarOpened) {
            document.body.addEventListener('touchmove', preventDefault, {passive:false});
        } else {
            document.body.removeEventListener('touchmove', preventDefault);
        }
    }, [navBarOpened])

    // TODO: Optimize NavBar (Remove use of 2 similar menu bars for mobile & desktop)
    return (
        <>
            <div className="w-[100%] h-[60px] top-0 left-0" />
            <div className="flex items-center justify-between fixed top-0 left-0 w-[100%] h-[60px] py-3 px-3 md:px-6 bg-neutral-200 dark:bg-neutral-800 z-[998]">
                <div className="pl-3 md:pl-0 flex justify-start w-0 grow">
                    <NLink href="/" textClass=" ">njf</NLink>
                </div>

                <div className="hidden md:flex gap-5 justify-center grow">
                    <MiddleLinks onClick={toggleNavBar} />
                </div>

                <div className="hidden md:flex items-center justify-end gap-5 w-0 grow">
                    <EndLinks onClick={toggleNavBar} />
                    <AccountButtons onClick={toggleNavBar} />
                </div>
                <div className="flex justify-end md:hidden text-neutral-300 z-[1000] w-0 grow">
                    <IconButton icon={navBarOpened ? mdiClose : mdiMenu} onClick={toggleNavBar} />
                </div>
                <div className={`absolute flex md:!hidden top-0 left-0 z-[999] w-screen ${navBarOpened ? "fixed" : "hidden"}`} style={{ height: `${pageHeight}px` }}>
                    <div className="bg-neutral-700 w-full flex flex-col items-start gap-[20px] p-10">
                        <div className="my-auto" />
                        <MiddleLinks onClick={toggleNavBar} />
                        <EndLinks onClick={toggleNavBar} />
                        <div className="my-auto" />
                        <AccountButtons onClick={toggleNavBar} />
                    </div>
                </div>
            </div>
        </>
    );
}

function MiddleLinks({ onClick }: {onClick: () => void}) {
    return (
        <>
            <NLink href="/" icon={mdiHome} onClick={onClick}>Home</NLink>
            <NLink href="/blog" icon={mdiTextBox} onClick={onClick}>Blog</NLink>
            <NLink href="/about" icon={mdiInformation} onClick={onClick}>About</NLink>
            <NLink href="/contact" icon={mdiEmail} onClick={onClick}>Contact</NLink>
        </>
    )
}

function EndLinks({ onClick }: {onClick: () => void}) {
    return (
        <>
            <NLink href="/admin" icon={mdiViewDashboard} onClick={onClick}>Admin Dashboard</NLink>
            <NLink href="/account" icon={mdiAccountBox} onClick={onClick}>account</NLink>
        </>
    )
}
function AccountButtons({ onClick }: {onClick: () => void}) {
    return (
        <div className="flex md:gap-5 items-center justify-between w-full md:w-max md:flex-row-reverse">
            <NLink href="/auth/signup" containerClass="border-[8px] md:border-[4px] rounded-xl md:p-0 md:px-2 border-green-600 px-4 p-1" onClick={onClick}>Sign Up</NLink>
            <NLink href="/auth/signin" containerClass="border-[8px] md:border-0 md:p-0 md:p-0 border-transparent px-4 p-1" onClick={onClick}>Sign In</NLink>
        </div>
    )
}

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export async function getStaticProps(context) {
    return {
        props: {},
    }
}