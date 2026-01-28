import { useState } from "react";
import { ManagerOption } from "./ManagerOption";
import type { ManagerLight } from "../../interfaces/Employee/ManagerInterface";


type ManagerDropdownProps = {
  managers: ManagerLight[];
  managerId: number | null;
  setManagerId: (id: number | null) => void;
};


export const ManagerDropdown = ({
  managers,
  managerId,
  setManagerId,
}: ManagerDropdownProps) => {
  const [open, setOpen] = useState(false);

  const selectedManager = managers.find(
    (m) => m.employeeId === managerId
  );

  return (
    <div className="relative col-span-2">
      <p className="text-xs mb-1 text-text">Appoint A Manager</p>

      {/* Selected */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full border border-gray-200 rounded p-2 text-left bg-card text-text hover:bg-accent/20"
      >
        {selectedManager ? (
          <ManagerOption employee={selectedManager} />
        ) : (
          <span className="text-sm text-text">No Manager</span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-72 overflow-y-auto border border-gray-200 bg-surface rounded shadow-lg">
          <div
            onClick={() => {
              setManagerId(null);
              setOpen(false);
            }}
            className="p-2 cursor-pointer hover:bg-accent/30 text-sm text-text"
          >
            No Manager
          </div>

          {managers.map((manager) => (
            <div
              key={manager.employeeId}
              onClick={() => {
                setManagerId(manager.employeeId);
                setOpen(false);
              }}
              className="p-2 cursor-pointer text-text hover:bg-accent/30"
            >
              <ManagerOption employee={manager} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
