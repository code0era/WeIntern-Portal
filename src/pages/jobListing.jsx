import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { State } from "country-state-city";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import JobCard from "@/components/job-cards";
import { getCompanies } from "@/api/apiCompanies";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const {
    // loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
    error,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#0ea5e9" />;
  }

  return (
    <div className="min-h-screen bg-sky-100 p-8">
      <h1 className="font-extrabold text-6xl sm:text-7xl text-center pb-8 text-slate-900">
        Latest Jobs
      </h1>

      {/* Add filter */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1 px-4 text-md bg-white border-sky-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-500"
        />
        <Button
          type="submit"
          className="h-full sm:w-28 bg-sky-500 hover:bg-sky-600 text-white"
        >
          Search
        </Button>
      </form>

      {/* clearing */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="bg-white border-sky-300 text-slate-900 focus:ring-sky-500">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent className="bg-white border-sky-200">
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name} className="hover:bg-sky-100 cursor-pointer">
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="bg-white border-sky-300 text-slate-900 focus:ring-sky-500">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent className="bg-white border-sky-200">
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id} className="hover:bg-sky-100 cursor-pointer">
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          className="sm:w-1/2 bg-sky-200 hover:bg-sky-300 text-sky-900"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#0ea5e9" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />;
            })
          ) : (
            <div className="text-slate-600 text-center col-span-full pt-10 text-xl font-medium">
              No Jobs Found 😢
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;