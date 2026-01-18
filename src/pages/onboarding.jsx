import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#0ea5e9" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100 py-20">
      <h2 className="font-extrabold text-7xl sm:text-8xl tracking-tighter text-slate-900 mb-12">
        I am a...
      </h2>
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl px-4 md:px-10">
        <Button
          className="h-36 text-2xl bg-sky-500 hover:bg-sky-600 text-white shadow-md transition-all hover:scale-105"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          className="h-36 text-2xl bg-sky-700 hover:bg-sky-800 text-white shadow-md transition-all hover:scale-105"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;