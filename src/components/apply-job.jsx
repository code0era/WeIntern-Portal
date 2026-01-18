/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";

const schema = z.object({
    experience: z
        .number()
        .min(0, { message: "Experience must be at least 0" })
        .int(),
    skills: z.string().min(1, { message: "Skills are required" }),
    education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
        message: "Education is required",
    }),
    resume: z
        .any()
        .refine(
            (file) =>
                file[0] &&
                (file[0].type === "application/pdf" ||
                    file[0].type === "application/msword"),
            { message: "Only PDF or Word documents are allowed" }
        ),
});

export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const {
        loading: loadingApply,
        error: errorApply,
        fn: fnApply,
    } = useFetch(applyToJob);

    const onSubmit = (data) => {
        fnApply({
            ...data,
            job_id: job.id,
            candidate_id: user.id,
            name: user.fullName,
            status: "applied",
            resume: data.resume[0],
        }).then(() => {
            fetchJob();
            reset();
        });
    };

    return (
        <Drawer open={applied ? false : undefined}>
            <DrawerTrigger asChild>
                <Button
                    size="lg"
                    // Keep destructive for 'Hiring Closed' to warn users, but use Sky Blue for 'Apply'
                    className={
                        job?.isOpen && !applied
                            ? "bg-sky-500 hover:bg-sky-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                    }
                    disabled={!job?.isOpen || applied}
                >
                    {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white">
                <DrawerHeader>
                    <DrawerTitle className="text-slate-900">
                        Apply for {job?.title} at {job?.company?.name}
                    </DrawerTitle>
                    <DrawerDescription className="text-slate-600">
                        Please fill the form below
                    </DrawerDescription>
                </DrawerHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 p-4 pb-0"
                >
                    <Input
                        type="number"
                        placeholder="Years of Experience"
                        className="flex-1 bg-white border-sky-300 text-slate-900 focus-visible:ring-sky-500 placeholder:text-slate-400"
                        {...register("experience", {
                            valueAsNumber: true,
                        })}
                    />
                    {errors.experience && (
                        <p className="text-red-500">{errors.experience.message}</p>
                    )}

                    <Input
                        type="text"
                        placeholder="Skills (Comma Separated)"
                        className="flex-1 bg-white border-sky-300 text-slate-900 focus-visible:ring-sky-500 placeholder:text-slate-400"
                        {...register("skills")}
                    />
                    {errors.skills && (
                        <p className="text-red-500">{errors.skills.message}</p>
                    )}

                    <Controller
                        name="education"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} {...field} className="text-slate-700">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Intermediate" id="intermediate" className="border-sky-400 text-sky-600" />
                                    <Label htmlFor="intermediate">Intermediate</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Graduate" id="graduate" className="border-sky-400 text-sky-600" />
                                    <Label htmlFor="graduate">Graduate</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Post Graduate" id="post-graduate" className="border-sky-400 text-sky-600" />
                                    <Label htmlFor="post-graduate">Post Graduate</Label>
                                </div>
                            </RadioGroup>
                        )}
                    />
                    {errors.education && (
                        <p className="text-red-500">{errors.education.message}</p>
                    )}

                    <Input
                        type="file"
                        accept=".pdf, .doc, .docx"
                        className="flex-1 file:text-sky-700 border-sky-300 text-slate-700 bg-white"
                        {...register("resume")}
                    />
                    {errors.resume && (
                        <p className="text-red-500">{errors.resume.message}</p>
                    )}
                    {errorApply?.message && (
                        <p className="text-red-500">{errorApply?.message}</p>
                    )}

                    {loadingApply && <BarLoader width={"100%"} color="#0ea5e9" />}

                    <Button
                        type="submit"
                        size="lg"
                        className="bg-sky-500 hover:bg-sky-600 text-white"
                    >
                        Apply
                    </Button>
                </form>

                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline" className="border-sky-200 text-sky-700 hover:bg-sky-50">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}