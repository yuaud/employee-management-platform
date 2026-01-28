import type { ManagerLight } from "../../interfaces/Employee/ManagerInterface";

type ManagerSelectProps = {
  managers: ManagerLight[];
  managerId: number | null;
  onChange: (id: number | null) => void;
};


export const ManagerSelect = ({
  managers,
  managerId,
  onChange,
}: ManagerSelectProps) => {
  return (
    <div className="col-span-2">
      <label className="block text-xs mb-0.5">Manager</label>

      <select
        value={managerId ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : null)
        }
        className="w-full border border-gray-200 p-1.5 rounded bg-bg text-text"
      >
        <option value="">No Manager</option>

        {managers.map((m) => (
          <option key={m.employeeId} value={m.employeeId}>
            #{m.employeeId} — {m.firstName} {m.lastName} ({m.department.departmentName})
          </option>
        ))}
      </select>
    </div>
  );
};
