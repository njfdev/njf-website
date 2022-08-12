import { RedirectToUserProfile, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="mx-auto w-min pt-10">
            <SignedOut>
                <SignIn />
            </SignedOut>
            <SignedIn>
                <RedirectToUserProfile />
            </SignedIn>
        </div>
    )
}