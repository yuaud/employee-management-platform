import { CircleX, Info, SquarePen } from "lucide-react";
import type { Job } from "../../interfaces/Job/JobInterface";

type JobCardListProps = {
    jobs: Job[];
    onInfo: (job: Job) => void;
    onEdit: (job: Job) => void;
    onDelete: (job: Job) => void;
}

type JobCardProps = {
    job: Job;
    onInfo: (job: Job) => void;
    onEdit: (job: Job) => void;
    onDelete: (job: Job) => void;
}

// Single card
export const JobCard = ({ job, onInfo, onEdit, onDelete }: JobCardProps) => {
  return (
    <div className="h-full rounded-lg border border-gray-200 p-4 bg-card shadow-sm hover:shadow-md transition flex flex-col">
      <div className="text-sm text-text">#{job.jobId}</div>
      <div className="mt-1 text-lg font-semibold text-text">{job.jobTitle}</div>
      {/* Actions */}
      <div className="mt-1 pt-3 border-t border-gray-300 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => onInfo(job)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Info size={14} />
            Info
          </button>

          <button
            onClick={() => onEdit(job)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            <SquarePen size={14} />
            Edit
          </button>
        </div>

        <button
          onClick={() => {
            const ok = window.confirm(`#${job.jobId} silinsin mi?`);
            if (!ok) return;
            onDelete(job);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700"
        >
          <CircleX size={14} />
          Delete
        </button>

      </div>
    </div>
  );
};

// List grid card view
export const JobCardList = ({ jobs, onInfo, onEdit, onDelete }: JobCardListProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
      {jobs.map((job) => (
        <JobCard key={job.jobId} job={job} onInfo={onInfo} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </div>
  );
};
