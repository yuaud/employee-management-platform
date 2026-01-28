import { CircleX, Info, SquarePen } from "lucide-react";
import type { LightDepartment } from "../../interfaces/Department/DepartmentInterface";

type DepartmentCardListProps = {
  departments: LightDepartment[];
  onInfo: (department: LightDepartment) => void;
  onEdit: (department: LightDepartment) => void;
  onDelete: (department: LightDepartment) => void;
};

type DepartmentCardProps = {
    department: LightDepartment;
    onInfo: (department: LightDepartment) => void;
    onEdit: (department: LightDepartment) => void;
    onDelete: (department: LightDepartment) => void;
}


// Single card
export const DepartmentCard = ({ department, onInfo, onEdit, onDelete }: DepartmentCardProps) => {
  return (
    <div className="h-full bg-card rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition flex flex-col">
      <div className="text-sm text-text">#{department.departmentId}</div>
      <div className="mt-1 flex items-baseline gap-1 text-text">
        <p className="font-semibold">Name: </p>
        <p>{department.departmentName}</p>
      </div>
      <div className="mt-1 flex items-baseline gap-1 text-text">
        <p className="font-semibold">Location: </p>
        <p>#{department.location.locationId},</p>
        <p>{department.location.city}/{department.location.country.countryName}</p>
      </div>
      <div className="mt-4 flex items-baseline gap-1 text-xs text-text">
        <p className="font-semibold">Employee Count on this department: </p>
        <p>{department.employeeCount}</p>
      </div>
      {/* Actions */}
      <div className="mt-1 pt-3 border-t border-gray-300 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => onInfo(department)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Info size={14} />
            Info
          </button>

          <button
            onClick={() => onEdit(department)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            <SquarePen size={14} />
            Edit
          </button>
        </div>

        <button
          onClick={() => {
            const ok = window.confirm(`#${department.departmentId} silinsin mi?`);
            if (!ok) return;
            onDelete(department);
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
export const DepartmentCardList = ({ departments, onInfo, onEdit, onDelete }: DepartmentCardListProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
      {departments.map((department) => (
        <DepartmentCard key={department.departmentId} department={department} onInfo={onInfo} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </div>
  );
};