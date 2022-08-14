import NLink from "components/NavBarLink";
import IconButton from "components/IconButton";
import { mdiTextBox, mdiInformation, mdiEmail, mdiHome, mdiMenu, mdiAccountBox, mdiClose, mdiViewDashboard, mdiRocket } from "@mdi/js";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NavBar() {
    const [navBarOpened, setNavBarOpened] = useState(false);
    const [isAdmin, setAdminStatus] = useState(false);
    const [isUser, setUserStatus] = useState(false);

    const toggleNavBar = (): void => {
        setNavBarOpened(!navBarOpened);
    };

    // TODO: Optimize NavBar (Remove use of 2 similar menu bars for mobile & desktop)
    return (
        <>
            <div className="w-[100%] h-[60px] top-0 left-0" />
            <div className="flex items-center justify-between fixed top-0 left-0 w-[100%] h-[60px] py-3 px-3 md:px-6 z-[9999] navbar-bg">
                <div className="pl-3 md:pl-0 flex justify-start w-0 grow">
                    <NLink href="/" textClass=" " onClick={toggleNavBar}>njf</NLink>
                </div>

                <div className="hidden md:flex gap-5 justify-center grow">
                    <MiddleLinks />
                </div>

                <div className="hidden md:flex items-center justify-end gap-5 w-0 grow">
                    <SignedIn>
                        <AccountButtons onClick={toggleNavBar} isAdmin={isAdmin} />
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <EndLinks />
                    </SignedOut>
                </div>
                <div className="flex gap-3 justify-end place-items-center md:hidden text-neutral-300 z-[1000] w-0 grow">
                    <UserButton />
                    <IconButton icon={navBarOpened ? mdiClose : mdiMenu} onClick={toggleNavBar} />
                </div>
            </div>
            <div className={`navbar-bg p-10 fixed md:!hidden top-[60px] left-0 z-[999] w-screen h-[calc(100vh_-_60px)] ${navBarOpened ? "fixed" : "hidden"} flex flex-col items-start gap-[20px]`}>
                <MiddleLinks onClick={toggleNavBar} />
                <SignedIn>
                    <AccountButtons onClick={toggleNavBar} isAdmin={isAdmin} />
                </SignedIn>
                <SignedOut>
                    <EndLinks onClick={toggleNavBar} />
                </SignedOut>
            </div>
        </>
    );
}

function MiddleLinks({ onClick }: {onClick?: () => void}) {
    return (
        <>
            <NLink href="/" icon={mdiHome} onClick={onClick}>Home</NLink>
            <NLink href="/blog" icon={mdiTextBox} onClick={onClick}>Blog</NLink>
            <NLink href="/pro" icon={mdiRocket} onClick={onClick}>Pro</NLink>
            <NLink href="/about" icon={mdiInformation} onClick={onClick}>About</NLink>
            <NLink href="/contact" icon={mdiEmail} onClick={onClick}>Contact</NLink>
        </>
    )
}

function AccountButtons({ onClick, isAdmin }: { onClick?: () => void, isAdmin: boolean }) {
    return (
        <>
            { isAdmin && <NLink href="/admin" icon={mdiViewDashboard} onClick={onClick}>Admin Dashboard</NLink> }
        </>
    )
}
function EndLinks({ onClick }: {onClick?: () => void}) {
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