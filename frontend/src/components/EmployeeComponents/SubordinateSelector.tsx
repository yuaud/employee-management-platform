import type { EmployeeLight } from "../../interfaces/Employee/EmployeeInterface";

interface SubordinateSelectorProps {
  employees: EmployeeLight[];
  value: number[]; // selectedSubordinateIds
  onChange: (ids: number[]) => void;
  currentEmployeeId?: number;
}

export function SubordinateSelector({
  employees,
  value,
  onChange,
  currentEmployeeId,
}: SubordinateSelectorProps) {

  // Şu an seçili subordinates (UI için)
  const currentSubordinates = employees.filter(e =>
    value.includes(e.employeeId)
  );

  // Eklenebilir employees
  const availableEmployees = employees.filter(e =>
    e.employeeId !== currentEmployeeId &&
    !value.includes(e.employeeId)
  );

  const addSubordinate = (id: number) => {
    if (value.includes(id)) return;
    onChange([...value, id]);
  };

  const removeSubordinate = (id: number) => {
    onChange(value.filter(v => v !== id));
  };

  return (
    <div className="space-y-3 w-full">

      {/* ADD */}
      <select
        value=""
        onChange={(e) => {
          const id = Number(e.target.value);
          if (id) addSubordinate(id);
        }}
        className="w-full border border-gray-200 p-2 rounded bg-card text-text text-sm"
      >
        <option className="bg-surface" value="">Add subordinate...</option>
        {availableEmployees.map(e => (
          <option className="bg-surface" key={e.employeeId} value={e.employeeId}>
            {e.firstName} {e.lastName} — {e.job.jobTitle}
          </option>
        ))}
      </select>

      {/* SELECTED */}
      {currentSubordinates.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {currentSubordinates.map(emp => (
            <div
              key={emp.employeeId}
              className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 bg-card shadow-sm text-text"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden border bg-gray-200 flex items-center justify-center shrink-0">
                {emp.fileUrl ? (
                  <img
                    src={emp.fileUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-gray-700">
                    {emp.firstName?.charAt(0)}
                    {emp.lastName?.charAt(0)}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">
                  {emp.firstName} {emp.lastName}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {emp.job.jobTitle} · {emp.department.departmentName}
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeSubordinate(emp.employeeId)}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
