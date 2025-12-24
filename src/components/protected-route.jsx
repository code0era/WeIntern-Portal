/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded, user } = useUser();
    const { pathname } = useLocation();

    // ⏳ Wait until Clerk is fully loaded
    if (!isLoaded) return null;

    // 🔒 Not signed in → redirect to sign-in
    if (!isSignedIn) {
        return <Navigate to="/?sign-in=true" replace />;
    }

    // 🧭 Signed in but role not selected → onboarding
    if (
        isSignedIn &&
        !user?.unsafeMetadata?.role &&
        pathname !== "/onboarding"
    ) {
        return <Navigate to="/onboarding" replace />;
    }

    return children;
};

export default ProtectedRoute;
