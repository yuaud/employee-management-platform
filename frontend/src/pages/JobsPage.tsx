import { useEffect, useState } from "react";
import {
  createJob,
  deleteJob,
  filterJobs,
  getJobById,
  updateJob,
} from "../services/jobService";
import type {
  Job,
  JobDetail,
  JobFilter,
  SortField,
} from "../interfaces/Job/JobInterface";
import { JobCardList } from "../components/JobComponents/JobCardList";
import JobEditSidebar from "../components/JobComponents/JobEditSidebar";
import { ArrowDown, ArrowUp, BrushCleaning, CirclePlus } from "lucide-react";
import JobDetailPopup from "../components/JobComponents/JobDetailPopup";
import { Pagination } from "../components/LayoutComponents/Pagination";

type Mode = "add" | "edit";

const Jobs = () => {
  const [filters, setFilters] = useState<JobFilter>({});
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailedJob, setDetailedJob] = useState<JobDetail | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("add");

  useEffect(() => {
    filterJobs(filters, page, 12).then((page) => {
      setJobs(page.content);
      setTotalPages(page.totalPages);
    });
  }, [filters, page]);

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setIsEditOpen(true);
    setMode("edit");
  };

  const handleInfo = async (job: Job) => {
    const detailedj = await getJobById(job.jobId);
    setDetailedJob(detailedj);
    setIsInfoOpen(true);
  };

  const handleSubmit = async (jobId: string, jobTitle: string) => {
    try {
      if (mode === "add") {
        await createJob(jobId, jobTitle);
        await filterJobs(filters, page, 12).then((page) => {
          setJobs(page.content);
        });
      } else if (mode === "edit" && selectedJob) {
        await updateJob(selectedJob.jobId, jobTitle);
        await filterJobs(filters, page, 12).then((page) => {
          setJobs(page.content);
        });
      }
      setIsEditOpen(false);
      setSelectedJob(null);
    } catch (err: unknown) {
      console.error("error: ", err);
    }
  };

  const handleDelete = async (job: Job) => {
    await deleteJob(job.jobId);
    await filterJobs(filters, page, 12).then((page) => {
      setJobs(page.content);
    });
  };

  const toggleSort = (field: SortField) => {
    setFilters((p) => {
      const sort = p.sort;
      let nextSort;
      if (!sort || sort.field !== field) {
        // sort yok ya da baska field var ilk atama DESC
        nextSort = { field, direction: "DESC" };
      } else if (sort.direction === "DESC") {
        nextSort = { field, direction: "ASC" };
      } else {
        nextSort = undefined;
      }
      return {
        ...p,
        sort: nextSort,
      };
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex mx-auto justify-between mb-4 w-1/3">
        <p className="font-semibold text-2xl mb-2 text-text">JOBS</p>
        <button
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded"
          onClick={() => {
            setMode("add");
            setSelectedJob(null);
            setIsEditOpen(true);
          }}
        >
          <CirclePlus />
          Create new Job
        </button>
      </div>
      <div className="rounded-lg border w-1/3 mx-auto border-gray-200 bg-card p-4 shadow-sm mb-8">
        <div className="grid grid-cols-[repeat(2,1fr)_auto] gap-4 items-end text-sm">
          {/* Search bar */}
          <div className="flex flex-col col-span-2 gap-1">
            <label className="text-xs text-gray-500">Search</label>
            <input
              type="text"
              placeholder="Job Title"
              className="border rounded px-2 py-1 bg-card text-text"
              value={filters.search === undefined ? "" : filters.search}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  search: e.target.value ? e.target.value : undefined,
                }))
              }
            />
          </div>
          {/* Clear Button */}
          <div className="flex items-end">
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition"
              title="Clear filters"
              onClick={() => setFilters({})}
            >
              <BrushCleaning size={16} />
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-center text-gray-500">
          <button
            className="flex items-center gap-2 border-b px-3 py-1"
            onClick={() => toggleSort("UPDATED_AT")}
          >
            Updated At
            {filters.sort?.direction === "ASC" && (
              <ArrowUp size={16} color="green" />
            )}
            {filters.sort?.direction === "DESC" && (
              <ArrowDown size={16} color="red" />
            )}
          </button>
        </div>
      </div>
      <div className="flex-1">
        <JobCardList
          jobs={jobs}
          onInfo={handleInfo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {isEditOpen && (
        <JobEditSidebar
          key={mode === "edit" ? selectedJob?.jobId : "add"}
          mode={mode}
          job={selectedJob}
          onSubmit={handleSubmit}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      {isInfoOpen && detailedJob && (
        <JobDetailPopup
          job={detailedJob}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Jobs;
