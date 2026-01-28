import type { Department } from "../../interfaces/Department/DepartmentInterface";
import { ISO8601formatDateTime } from "../../utility/ISO8601FormatDate";

type Props = {
  department: Department;
  onClose: () => void;
};

const DepartmentDetailPopup = ({ department, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl border border-text bg-surface rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text">
            Department Details
          </h2>
          <button onClick={onClose} className="text-xl text-gray-500 hover:text-accent">
            ✕
          </button>
        </div>

        {/* Department Info */}
        <div className="space-y-3 text-text">
          <div>
            <span className="font-semibold">Department ID:</span>{" "}
            {department.departmentId}
          </div>

          <div>
            <span className="font-semibold">Department Name:</span>{" "}
            {department.departmentName}
          </div>

          <div>
            <span className="font-semibold">Employee Count:</span>{" "}
            {department.employeeCount}
          </div>
          <div className="flex text-xs text-gray-500 gap-4 mt-4">
            <span className="gap-2">
              Created At: {ISO8601formatDateTime(department.createdAt)}
            </span>
            <span className="gap-2">
              Last Updated At: {ISO8601formatDateTime(department.updatedAt)}
            </span>
          </div>
        </div>

        {/* Location Info */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-text mb-2">Location</h3>

          <div className="space-y-2 text-text">
            <div>
              <span className="font-semibold">Country:</span>{" "}
              {department.location.country.countryName}
            </div>

            {department.location.city && (
              <div>
                <span className="font-semibold">City:</span>{" "}
                {department.location.city}
              </div>
            )}

            {department.location.streetAddress && (
              <div>
                <span className="font-semibold">Street Address:</span>{" "}
                {department.location.streetAddress}
              </div>
            )}

            {department.location.postalCode && (
              <div>
                <span className="font-semibold">Postal Code:</span>{" "}
                {department.location.postalCode}
              </div>
            )}
          </div>
        </div>

        {/* Employees (Ultra Light) */}
        {department.employees.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-text mb-2">Employees</h3>

            <div className="border border-text rounded max-h-56 overflow-y-auto divide-y">
              {department.employees.map((emp) => (
              <div
                key={emp.employeeId}
                className="p-3 text-sm text-text flex items-center justify-center bg-card gap-3"
              >
                <div className="w-13 h-13 rounded-full border border-gray-300 shrink-0 flex items-center justify-center bg-gray-100 overflow-hidden">
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
      </div>
    </div>
  );
};

export default DepartmentDetailPopup;
