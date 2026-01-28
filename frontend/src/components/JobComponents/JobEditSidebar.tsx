import { useState } from "react";
import type { Job } from "../../interfaces/Job/JobInterface";

type JobEditSidebarProps = {
    mode: "add" | "edit";
    job?: Job | null;
    onClose: () => void;
    onSubmit: (jobId:string, jobTitle:string) => void;
};

type FormErrors = {
  jobId?: string;
  jobTitle?: string;
}

const JobEditSidebar = ({
  mode,
  job,
  onClose,
  onSubmit,
}: JobEditSidebarProps) => {
  const [jobId, setJobId] = useState<string>(job?.jobId ?? "");
  const [jobTitle, setJobTitle] = useState<string>(job?.jobTitle ?? "");
  const [errors, setErrors] = useState<FormErrors>({});


  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if(mode === "add" && !jobId.trim()){
      newErrors.jobId = "Job Id boş olamaz";
    }
    if(!jobTitle.trim()){
      newErrors.jobTitle = "Job Title boş olamaz";
    } else if(jobTitle.length > 150){
      newErrors.jobTitle = "Job Title en fazla 150 karakter olabilir";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = () => {
    if(!validate()) return;
    onSubmit(jobId, jobTitle);
    onClose();
  };

  return (
    <>
      {mode === "edit" && (
        <aside className="fixed top-0 right-0 h-screen w-96 bg-surface border-l shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-text font-semibold">
              Edit Job: #{job?.jobId}
            </h2>
            <button className="text-text" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <p>Job Title: </p>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
            />
            {errors.jobTitle && (
              <p className="text-sm text-red-500">{errors.jobTitle}</p>
            )}

            <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded mt-4">
              Save
            </button>
          </div>
        </aside>
      )}
      {mode === "add" && (
        <aside className="fixed top-0 right-0 h-screen w-96 bg-surface border-l shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-text font-semibold">Create New Job</h2>
            <button className="text-text" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-text"><span className="text-red-600 font-semibold">*</span>Job Id: </p>
            <input
              value={jobId}
              onChange={(e) => {
                setJobId(e.target.value);
                setErrors(prev => ({ ...prev, jobId: undefined }))
              }}
              className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
            />
            {errors.jobId && (
              <p className="text-sm text-red-500">{errors.jobId}</p>
            )}

            <p className="mt-4 text-text"><span className="text-red-600 font-semibold">*</span>Job Title: </p>
            <input
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
                setErrors(prev => ({...prev, jobTitle: undefined}))
              }}
              className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
            />
            {errors.jobTitle && (
              <p className="text-sm text-red-500">{errors.jobTitle}</p>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-2 rounded mt-4"
            >
              Create
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default JobEditSidebar;
