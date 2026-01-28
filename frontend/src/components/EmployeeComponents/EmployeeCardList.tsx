import { CircleX, Info, SquarePen } from "lucide-react";
import type { EmployeeLight } from "../../interfaces/Employee/EmployeeInterface";

type EmployeeCardProps = {
    employee: EmployeeLight;
    onInfo: (employee: EmployeeLight) => void;
    onEdit: (employee: EmployeeLight) => void;
    onDelete: (employee: EmployeeLight) => void;
}

type EmployeeCardListProps = {
    employees: EmployeeLight[];
    onInfo: (employee: EmployeeLight) => void;
    onEdit: (employee: EmployeeLight) => void;
    onDelete: (employee: EmployeeLight) => void;
}

// Single card
export const EmployeeCard = ({ employee, onInfo, onEdit, onDelete }: EmployeeCardProps) => {
return (
  <div className="rounded-lg border border-gray-200 bg-card text-text p-4 shadow-sm hover:shadow-md transition h-full flex flex-col relative">
    {employee.isManager && (
  <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-indigo-600 text-white font-medium">
    Manager
  </span>
)}
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div className="w-22 h-22 self-center rounded-full border border-gray-300 shrink-0 flex items-center justify-center bg-gray-100 overflow-hidden">
      {employee.fileUrl ? (
                  <img
                    src={employee.fileUrl}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-gray-700">
                    {employee.firstName?.charAt(0)}
                    {employee.lastName?.charAt(0)}
                  </span>
                )}
      </div>

      <div className="flex-1 min-w-0">
        {/* Name */}
        <div className="font-semibold text-text truncate">
          {employee.firstName} {employee.lastName}
        </div>

        {/* Email */}
        <div className="text-xs text-gray-500 truncate">
          {employee.email}
        </div>

        {/* Phone Number */}
        <div className="text-xs text-gray-500 truncate">
          {employee.phoneNumber ?? "\u00A0"}
        </div>

        {/* Job & Department */}
        <div className="mt-2 text-xs  flex flex-wrap gap-x-4 gap-y-1">
          <span>
            <span className="font-medium">Job:</span> {employee.job.jobTitle}
          </span>
          <span>
            <span className="font-medium">Department:</span>{" "}
            {employee.department.departmentName}
          </span>
        </div>

        {/* Meta */}
        <div className="mt-2 text-xs  flex flex-wrap gap-x-4 gap-y-1">
          <span>
            <span className="font-medium">Hire Date:</span>{" "}
            {new Date(employee.hireDate).toLocaleDateString()}
          </span>
          {employee.salary ? (
            <span>
              <span className="font-medium">Salary:</span> ${employee.salary}
            </span>
          ) : (
            <span>{"\u00A0"}</span>
          )}
        </div>
      </div>
    </div>

    {/* Actions */}
    <div className="mt-4 pt-3 border-t border-gray-300 flex items-center justify-between">
      <div className="flex gap-2">
        <button
          onClick={() => onInfo(employee)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Info size={14} />
          Info
        </button>

        <button
          onClick={() => onEdit(employee)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          <SquarePen size={14} />
          Edit
        </button>
      </div>

      <button
        onClick={() => {
          const ok = window.confirm(`#${employee.employeeId} silinsin mi?`);
          if (!ok) return;
          onDelete(employee);
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
export const EmployeeCardList = ({ employees, onInfo, onEdit, onDelete }: EmployeeCardListProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 items-stretch">
      {employees.map((employee) => (
        <EmployeeCard key={employee.employeeId} employee={employee} onInfo={onInfo} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </div>
  );
};
