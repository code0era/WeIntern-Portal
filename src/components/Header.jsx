import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
    SignedIn,
    SignedOut,
    SignIn,
    SignInButton,
    UserButton,
    useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [search, setSearch] = useSearchParams();
    const { user } = useUser();

    useEffect(() => {
        if (search.get("sign-in")) {
            setShowSignIn(true);
        }
    }, [search]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
            setSearch({});
        }
    };

    return (
        <>
            <nav className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/80 backdrop-blur-md border-b border-sky-200">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="WeIntern"
                        className="h-10 w-10 rounded-full bg-sky-50 p-1 shadow-sm border border-sky-100"
                    />
                    <span className="hidden sm:block text-lg font-bold text-sky-900">
                        WeIntern
                    </span>
                </Link>

                {/* Right actions */}
                <div className="flex items-center gap-3">
                    <SignedOut>
                        <SignInButton>
                            <Button
                                variant="outline"
                                className="border-sky-300 text-sky-700 hover:bg-sky-50"
                                onClick={() => setShowSignIn(true)}
                            >
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        {/* condition */}
                        {user?.unsafeMetadata?.role === "recruiter" && (
                            <Link to="/post-job">
                                <Button className="rounded-full bg-sky-600 text-white shadow-sm hover:bg-sky-700 transition-colors">
                                    <PenBox size={18} className="mr-2" />
                                    Post a Job
                                </Button>
                            </Link>
                        )}

                        <UserButton appearance={{ elements: { avatarBox: "h-9 w-9" } }}>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="My Jobs"
                                    labelIcon={<BriefcaseBusiness size={15} />}
                                    href="/my-jobs"
                                />
                                <UserButton.Link
                                    label="Saved Jobs"
                                    labelIcon={<Heart size={15} />}
                                    href="/saved-jobs"
                                />
                                <UserButton.Action label="manageAccount" />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>
            </nav>

            {showSignIn && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-sky-900/50 backdrop-blur-sm z-[100]"
                    onClick={handleOverlayClick}
                >
                    <SignIn
                        signUpForceRedirectUrl="/onboarding"
                        fallbackRedirectUrl="/onboarding"
                    />
                </div>
            )}
        </>
    );
};

export default Header;