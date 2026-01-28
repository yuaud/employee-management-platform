import type { ManagerLight } from "../../interfaces/Employee/ManagerInterface";

export const ManagerOption = ({ employee }: { employee: ManagerLight }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full border border-gray-300 shrink-0 flex items-center justify-center bg-gray-100 overflow-hidden">
        {employee.fileUrl ? (
          <img
            src={employee.fileUrl}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs font-semibold text-gray-700">
            {employee.firstName.charAt(0)}
            {employee.lastName.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">
          {employee.firstName} {employee.lastName}
        </div>

        <div className="text-xs text-gray-500 truncate">
          {employee.email}
        </div>

        <div className="text-xs text-gray-500 truncate">
          {employee.phoneNumber ?? "\u00A0"}
        </div>

        <div className="mt-1 text-xs flex flex-wrap gap-x-3 gap-y-0.5">
          <span>
            <span className="font-medium">Job:</span>{" "}
            {employee.job.jobTitle}
          </span>
          <span>
            <span className="font-medium">Dept:</span>{" "}
            {employee.department.departmentName}
          </span>
        </div>
      </div>
    </div>
  );
};
