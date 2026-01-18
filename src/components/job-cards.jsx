/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
    job,
    savedInit = false,
    onJobAction = () => { },
    isMyJob = false,
}) => {
    const [saved, setSaved] = useState(savedInit);

    const { user } = useUser();

    const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
        job_id: job.id,
    });

    const {
        loading: loadingSavedJob,
        data: savedJob,
        fn: fnSavedJob,
    } = useFetch(saveJob);

    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
        });
        onJobAction();
    };

    const handleDeleteJob = async () => {
        await fnDeleteJob();
        onJobAction();
    };

    useEffect(() => {
        if (savedJob !== undefined) setSaved(savedJob?.length > 0);
    }, [savedJob]);

    return (
        <Card className="flex flex-col bg-white border-sky-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            {loadingDeleteJob && (
                <BarLoader className="mt-4" width={"100%"} color="#0ea5e9" />
            )}
            <CardHeader className="flex">
                <CardTitle className="flex justify-between font-bold text-slate-900">
                    {job.title}
                    {isMyJob && (
                        <Trash2Icon
                            fill="red"
                            size={18}
                            className="text-red-300 cursor-pointer hover:text-red-500 transition-colors"
                            onClick={handleDeleteJob}
                        />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1 text-slate-700">
                <div className="flex justify-between">
                    {job.company && <img src={job.company.logo_url} className="h-6" alt={job.company.name} />}
                    <div className="flex gap-2 items-center text-slate-600 font-medium">
                        <MapPinIcon size={15} className="text-sky-600" /> {job.location}
                    </div>
                </div>
                <hr className="border-sky-100" />
                <p className="text-sm sm:text-base leading-relaxed">
                    {job.description.substring(0, job.description.indexOf("."))}.
                </p>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`} className="flex-1">
                    <Button
                        variant="secondary"
                        className="w-full bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-200"
                    >
                        More Details
                    </Button>
                </Link>
                {!isMyJob && (
                    <Button
                        variant="outline"
                        className="w-15 border-sky-300 text-sky-600 hover:bg-sky-50"
                        onClick={handleSaveJob}
                        disabled={loadingSavedJob}
                    >
                        {saved ? (
                            <Heart size={20} fill="#ef4444" className="text-red-500" />
                        ) : (
                            <Heart size={20} />
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default JobCard;