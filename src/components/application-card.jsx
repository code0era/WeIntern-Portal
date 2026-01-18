/* eslint-disable react/prop-types */
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { updateApplicationStatus } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const ApplicationCard = ({ application, isCandidate = false }) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = application?.resume;
        link.target = "_blank";
        link.click();
    };

    const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
        updateApplicationStatus,
        {
            job_id: application.job_id,
        }
    );

    const handleStatusChange = (status) => {
        fnHiringStatus(status).then(() => fnHiringStatus());
    };

    return (
        <Card className="bg-white border-sky-200 shadow-sm hover:shadow-md transition-shadow">
            {loadingHiringStatus && <BarLoader width={"100%"} color="#0ea5e9" />}
            <CardHeader>
                <CardTitle className="flex justify-between font-bold text-slate-900">
                    {isCandidate
                        ? `${application?.job?.title} at ${application?.job?.company?.name}`
                        : application?.name}
                    <Download
                        size={18}
                        className="bg-sky-100 text-sky-600 hover:bg-sky-200 rounded-full h-8 w-8 p-1.5 cursor-pointer transition-colors"
                        onClick={handleDownload}
                    />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className="flex flex-col md:flex-row justify-between text-slate-700">
                    <div className="flex gap-2 items-center">
                        <BriefcaseBusiness size={15} className="text-sky-600" /> {application?.experience} years of
                        experience
                    </div>
                    <div className="flex gap-2 items-center">
                        <School size={15} className="text-sky-600" />
                        {application?.education}
                    </div>
                    <div className="flex gap-2 items-center">
                        <Boxes size={15} className="text-sky-600" /> Skills: {application?.skills}
                    </div>
                </div>
                <hr className="border-sky-100" />
            </CardContent>
            <CardFooter className="flex justify-between text-slate-600">
                <span>{new Date(application?.created_at).toLocaleString()}</span>
                {isCandidate ? (
                    <span className="capitalize font-bold text-slate-900">
                        Status: {application.status}
                    </span>
                ) : (
                    <Select
                        onValueChange={handleStatusChange}
                        defaultValue={application.status}
                    >
                        <SelectTrigger className="w-52 bg-white border-sky-300 text-slate-900 focus:ring-sky-500">
                            <SelectValue placeholder="Application Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-sky-200">
                            <SelectItem value="applied" className="hover:bg-sky-100 cursor-pointer">Applied</SelectItem>
                            <SelectItem value="interviewing" className="hover:bg-sky-100 cursor-pointer">Interviewing</SelectItem>
                            <SelectItem value="hired" className="hover:bg-sky-100 cursor-pointer">Hired</SelectItem>
                            <SelectItem value="rejected" className="text-red-600 hover:bg-red-50 cursor-pointer">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </CardFooter>
        </Card>
    );
};

export default ApplicationCard;