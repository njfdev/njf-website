import { RedirectToUserProfile, SignedIn, SignedOut, SignUp } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="mx-auto w-min pt-10">
            <SignedOut>
                <SignUp />
            </SignedOut>
            <SignedIn>
                <RedirectToUserProfile />
            </SignedIn>
        </div>
    )
}