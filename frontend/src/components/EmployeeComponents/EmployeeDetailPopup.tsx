import { useEffect, useState } from "react";
import type { EmployeeDetail } from "../../interfaces/Employee/EmployeeInterface";
import type { JobHistory, JobHistoryRequest } from "../../interfaces/JobHistory/JobHistoryInterface";
import { createJobHistory, deleteJobHistory, getAllJobHistory } from "../../services/jobHistoryService";
import { CircleX } from "lucide-react";
import { ISO8601formatDateTime } from "../../utility/ISO8601FormatDate";

interface EmployeeDetailModalProps {
  employee: EmployeeDetail;
  onClose: () => void;
}

type FormErrors = {
  companyName?: string;
  startDate?: string;
  endDate?: string;
  job?: string;
}

export function EmployeeDetailModal({
  employee,
  onClose,
}: EmployeeDetailModalProps) {
  const [jobHistory, setJobHistory] = useState<JobHistory[]>([]);
  const [jobHistoryForm, setJobHistoryForm] = useState<JobHistoryRequest>({
    companyName: "",
    jobId: "",
    startDate: "",
    endDate: ""
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const subordinates = employee.subordinates ?? [];

    useEffect(() => {
        getAllJobHistory(employee.employeeId).then((jobHistories) => 
            setJobHistory(jobHistories)
        );
    }, [employee.employeeId]);

    const validate = (): boolean => {
      const newErrors: FormErrors = {};

      // companyName: optional, max 255
      if (
        jobHistoryForm.companyName &&
        jobHistoryForm.companyName.length > 255
      ) {
        newErrors.companyName = "Company name can be at most 255 characters";
      }

      // startDate: required
      if (!jobHistoryForm.startDate) {
        newErrors.startDate = "Start date can not be empty";
      }

      // endDate: optional, but must be >= startDate
      if (jobHistoryForm.endDate && jobHistoryForm.startDate) {
        const start = new Date(jobHistoryForm.startDate);
        const end = new Date(jobHistoryForm.endDate);

        if (end < start) {
          newErrors.endDate = "End date can not be before start date";
        }
      }

      // job: required, max 200
      if (!jobHistoryForm.jobId.trim()) {
        newErrors.job = "Job can not be empty";
      } else if (jobHistoryForm.jobId.length > 200) {
        newErrors.job = "Job can be at most 200 characters";
      }

      setErrors(newErrors);
      console.log("new errors: ", newErrors);
      
      return Object.keys(newErrors).length === 0;
    };

    const handleAddJobHistory = async () => {
    if(!validate()) return;
    const payload: JobHistoryRequest = {
        jobId: jobHistoryForm.jobId,
        startDate: jobHistoryForm.startDate,
        ...(jobHistoryForm.companyName && { companyName: jobHistoryForm.companyName }),
        ...(jobHistoryForm.endDate && { endDate: jobHistoryForm.endDate })
    };

    const created = await createJobHistory(employee.employeeId, payload);

    setJobHistory(prev => [created, ...prev]);
    setJobHistoryForm({ companyName: "", jobId: "", startDate: "", endDate: "" });
    setShowForm(false);
    };

    const handleDeleteJobHistory = async (jobHistoryId: number) => {
    await deleteJobHistory(employee.employeeId, jobHistoryId);
    setJobHistory(prev => prev.filter(j => j.jobHistoryId !== jobHistoryId));
    };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-xl bg-surface border text-text shadow-xl overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {employee.fileUrl ? (
                <img
                  src={employee.fileUrl}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-semibold text-sm">
                  {employee.firstName.charAt(0)}
                  {employee.lastName.charAt(0)}
                </span>
              )}
            </div>

            <div>
              <div className="font-semibold">
                {employee.firstName} {employee.lastName}
              </div>
              <div className="text-sm text-gray-500">
                {employee.job.jobTitle} · {employee.department.departmentName}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-sm text-text hover:text-accent"
          >
            <CircleX/>
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">

          {/* BASIC INFO */}
          <section>
            
            <h3 className="font-semibold mb-2">Employee Info</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><b>Email:</b> {employee.email}</div>
              <div><b>Phone:</b> {employee.phoneNumber}</div>
              <div><b>Hire Date:</b> {employee.hireDate}</div>
              <div><b>Salary:</b> {employee.salary}</div>
              <div><b>Is Manager?:</b> {employee.isManager ? "Yes" : "No"}</div>
            </div>
              <div className="flex text-xs text-gray-500 gap-4 mt-4">
                <span className="gap-2">
                Created At: {ISO8601formatDateTime(employee.createdAt)}
              </span>
              <span className="gap-2">
                Last Updated At: {ISO8601formatDateTime(employee.updatedAt)}
              </span>
              </div>
          </section>

            {/* MANAGER */}
            {employee.manager && (
            <section>
                <h3 className="font-semibold mb-2">Reports to</h3>

                <div className="border rounded-lg px-3 py-2 bg-card">
                <div className="flex items-center gap-3">
                    {/* AVATAR */}
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    {employee.manager.fileUrl ? (
                        <img
                        src={employee.manager.fileUrl}
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-text">
                        {employee.manager.firstName.charAt(0)}
                        {employee.manager.lastName.charAt(0)}
                        </div>
                    )}
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">
                    {/* NAME */}
                    <div className="font-medium text-sm truncate">
                        {employee.manager.firstName} {employee.manager.lastName}
                    </div>

                    {/* JOB + DEPARTMENT */}
                    <div className="text-xs text-gray-500 truncate">
                        {employee.manager.job.jobTitle}
                        <span className="mx-1">·</span>
                        {employee.manager.department.departmentName}
                    </div>

                    {/* CONTACT */}
                    <div className="text-xs text-gray-400 flex gap-4 truncate">
                        <span className="truncate">{employee.manager.email}</span>
                        <span className="truncate">{employee.manager.phoneNumber}</span>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            )}



          {/* SUBORDINATES */}
          {employee.isManager && (
            <section>
            <h3 className="font-semibold mb-2">
              Subordinates ({subordinates.length})
            </h3>

            {subordinates.length === 0 ? (
              <div className="text-sm text-gray-500">
                No subordinates
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {subordinates.map(sub => (
                  <div
                    key={sub.employeeId}
                    className="flex items-center gap-3 border rounded-lg p-3 bg-card"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                      {sub.fileUrl && (
                        <img
                          src={sub.fileUrl}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {sub.firstName} {sub.lastName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {sub.job.jobTitle} · {sub.department.departmentName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          )}
          {/* JOB HISTORY */}
            <section className="mt-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Job History</h3>

                <button
                onClick={() => setShowForm(v => !v) }
                className="text-xs px-3 py-1 border rounded hover:bg-accent/40"
                >
                + Add
                </button>
            </div>

            {showForm && (
            <div className="space-y-2 border-b pb-2 text-sm">
                {/* ROW 1 */}
                <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                <input
                    placeholder="Company"
                    value={jobHistoryForm.companyName}
                    onChange={e =>
                    setJobHistoryForm(p => ({ ...p, companyName: e.target.value }))
                    }
                    className="border rounded p-2"
                />
                {errors.companyName && (<span className="text-xs text-red-600">{errors.companyName}</span>)}
                </div>
                <div className="flex flex-col">
                <input
                    placeholder="Job title"
                    value={jobHistoryForm.jobId}
                    onChange={e =>
                    setJobHistoryForm(p => ({ ...p, jobId: e.target.value }))
                    }
                    className="border rounded p-2"
                />
                {errors.job && (<span className="text-xs text-red-600">{errors.job}</span>)}
                </div>
                </div>

                {/* ROW 2 */}
                <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                <input
                    type="date"
                    value={jobHistoryForm.startDate}
                    onChange={e =>
                    setJobHistoryForm(p => ({ ...p, startDate: e.target.value }))
                    }
                    className="border rounded p-2"
                />
                {errors.startDate && (<span className="text-xs text-red-600">{errors.startDate}</span>)}
                </div>
                <div className="flex flex-col">
                <input
                    type="date"
                    value={jobHistoryForm.endDate}
                    onChange={e =>
                    setJobHistoryForm(p => ({ ...p, endDate: e.target.value }))
                    }
                    className="border rounded p-2"
                />
                </div>
                {errors.endDate && (<span className="text-xs text-red-600">{errors.endDate}</span>)}
                </div>
                {/* ACTIONS */}
                <div className="flex justify-end gap-2 pt-1">
                <button
                    onClick={() => {setShowForm(false); setJobHistoryForm({ companyName: "", jobId: "", startDate: "", endDate: "" });}}
                    className="text-xs px-3 py-1 border rounded hover:cursor-pointer bg-red-600/50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddJobHistory}
                    className="text-xs px-3 py-1 border rounded hover:cursor-pointer bg-green-600/50"
                >
                    Save
                </button>
                </div>
            </div>
            )}


            {jobHistory.length === 0 ? (
                <p className="text-xs text-gray-400">No job history</p>
            ) : (
                <div className="space-y-2 mt-4">
                {jobHistory.map(jh => (
                    <div
                    key={jh.jobHistoryId}
                    className="flex items-center justify-between border rounded-lg p-3 bg-card"
                    >
                    {/* INFO */}
                    <div className="min-w-0">
                        <div className="text-xs text-gray-500 truncate">
                        {jh.companyName}
                        </div>
                        <div className="font-medium text-sm truncate">
                        {jh.job}
                        </div>
                        <div className="text-xs text-gray-400">
                        {jh.startDate} {jh.endDate && `– ${jh.endDate}`}
                        </div>
                    </div>

                    {/* ACTION */}
                    <button
                        onClick={() => handleDeleteJobHistory(jh.jobHistoryId)}
                        className="text-xs text-red-600 hover:underline hover:cursor-pointer"
                    >
                        Delete
                    </button>
                    </div>
                ))}
                </div>
            )}
            </section>

        </div>
      </div>
    </div>
  );
}
