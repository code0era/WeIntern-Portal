import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#0ea5e9" />;
  }

  return (
    <div className="min-h-screen bg-sky-100 p-8 flex flex-col gap-8">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="font-extrabold pb-3 text-4xl sm:text-6xl text-slate-900">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>

      <div className="flex justify-between items-center font-medium text-slate-700">
        <div className="flex gap-2 items-center">
          <MapPinIcon className="text-sky-600" /> {job?.location}
        </div>
        <div className="flex gap-2 items-center">
          <Briefcase className="text-sky-600" /> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2 items-center">
          {job?.isOpen ? (
            <>
              <DoorOpen className="text-sky-600" /> Open
            </>
          ) : (
            <>
              <DoorClosed className="text-red-500" /> Closed
            </>
          )}
        </div>
      </div>

      {/* Recruiter Status Control */}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full text-white ${job?.isOpen ? "bg-sky-500 hover:bg-sky-600" : "bg-red-500 hover:bg-red-600"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-white border-sky-200">
            <SelectItem value="open" className="hover:bg-sky-100 cursor-pointer">Open</SelectItem>
            <SelectItem value="closed" className="text-red-600 hover:bg-red-50 cursor-pointer">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">About the job</h2>
      <p className="sm:text-lg text-slate-700 leading-relaxed">{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
        What we are looking for
      </h2>

      {/* Wrapped in data-color-mode="light" to ensure text is dark on light background */}
      <div data-color-mode="light">
        <MDEditor.Markdown
          source={job?.requirements}
          className="bg-transparent sm:text-lg text-slate-700"
        />
      </div>

      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.user_id === user.id)}
        />
      )}

      {loadingHiringStatus && <BarLoader width={"100%"} color="#0ea5e9" />}

      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold mb-4 text-xl ml-1 text-slate-900">Applications</h2>
          {job?.applications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobPage;