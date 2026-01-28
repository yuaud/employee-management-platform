import type { JobDetail } from "../../interfaces/Job/JobInterface";
import { ISO8601formatDateTime } from "../../utility/ISO8601FormatDate";

interface JobDetailPopupProps {
  job: JobDetail;
  onClose: () => void;
}

const JobDetailPopup = ({ job, onClose }: JobDetailPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-surface border border-text w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text">
            Job Details
          </h2>
          <button
            onClick={onClose}
            className="text-text text-lg"
          >
            ✕
          </button>
        </div>

        {/* Job Info */}
        <div className="space-y-1 mb-4">
          <p className="text-text">
            <span className="font-semibold">Job ID:</span> {job.jobId}
          </p>
          <p className="text-text">
            <span className="font-semibold">Job Title:</span> {job.jobTitle}
          </p>
          <p className="text-text">
            <span className="font-semibold">Employee Count:</span>{" "}
            {job.employeeCount}
          </p>
          <div className="flex text-xs text-gray-500 gap-4">
            <span>Created At: {ISO8601formatDateTime(job.createdAt)}</span> 
            <span>Last Updated At: {ISO8601formatDateTime(job.updatedAt)}</span>
          </div>
        </div>

        {/* Employees */}
        {job.employees.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-text mb-2">Employees</h3>

            <div className="border border-text rounded max-h-56 overflow-y-auto divide-y">
            {job.employees.map((emp) => (
              <div
                key={emp.employeeId}
                className="p-3 text-sm text-text flex items-center justify-center gap-3 bg-card"
              >
                <div className="w-12 h-12 rounded-full border border-gray-300 shrink-0 flex items-center justify-center bg-gray-100 overflow-hidden">
                {emp.fileUrl ? (
                  <img
                    src={emp.fileUrl}
                    alt={`${emp.firstName} ${emp.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-gray-700">
                    {emp.firstName?.charAt(0)}
                    {emp.lastName?.charAt(0)}
                  </span>
                )}
              </div>

                <div className="flex-1">
                  {/* Name */}
                  <div className="font-medium">
                    {emp.firstName} {emp.lastName}
                  </div>

                  {/* Meta info */}
                  <div className="mt-1 flex justify-between items-start gap-6 text-xs text-gray-500">
                    {/* Email */}
                    <div className="max-w-[65%] truncate">
                      <span className="font-semibold">Email:</span>{" "}
                      <span title={emp.email}>{emp.email}</span>
                    </div>

                    {/* Hire Date */}
                    <div className="whitespace-nowrap">
                      <span className="font-semibold">Hire Date:</span>{" "}
                      {new Date(emp.hireDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {job.employees.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">
            No employees assigned to this job.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobDetailPopup;
