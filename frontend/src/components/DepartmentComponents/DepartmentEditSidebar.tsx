import { useState } from "react";
import type { DepartmentRequest, LightDepartment } from "../../interfaces/Department/DepartmentInterface";
import { CirclePlus } from "lucide-react";
import type { Location } from "../../interfaces/Location/LocationInterface";

type DepartmentEditSidebarProps = {
    mode: "add" | "edit";
    department?: LightDepartment | undefined | null;
    locations: Location[];
    onLocationPopup: () => void;
    onClose: () => void;
    onSubmit: (department: DepartmentRequest) => void;
}

type FormErrors = {
  departmentName?: string;
  locationId?: string;
};

const DepartmentEditSidebar = ({
  mode,
  department,
  locations,
  onLocationPopup,
  onClose,
  onSubmit,
}: DepartmentEditSidebarProps) => {
  const [departmentName, setDepartmentName] = useState<string>(
    department?.departmentName ?? ""
  );
  const [locationId, setLocationId] = useState<number>(
    department?.location.locationId ?? 0
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (mode === "add") {
      if (!locationId) {
        newErrors.locationId = "Location cannot be empty";
      }
      if (!departmentName.trim()) {
        newErrors.departmentName = "Department Name cannot be empty";
      } else if (departmentName.length > 255) {
        newErrors.departmentName =
          "Department Name must be less than 255 characters";
      }
    }
    if (mode === "edit") {
      // countryId edit'te opsiyonel, ama verilmişse boş olamaz
      if (!locationId) {
        newErrors.locationId = "Location cannot be empty";
      }
      if (departmentName && departmentName.length > 255) {
        newErrors.departmentName =
          "Department Name must be less than 255 characters";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({ departmentName, locationId } as DepartmentRequest);
    onClose();
  };
  return (
    <>
      {mode === "edit" && (
        <aside className="fixed top-0 right-0 h-screen w-96 bg-surface border-l shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-text font-semibold">
              Edit Department: #{department?.departmentId}
            </h2>
            <button className="text-text" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <p className="mt-4 text-text">Department Name: </p>
            <input
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full border border-gray-200 bg-card shadow-sm text-text p-2 rounded"
            />
            {errors.departmentName && (
              <p className="text-sm text-red-600">{errors.departmentName}</p>
            )}
            <p className="text-text mt-4">Location: </p>
            <select
              value={locationId}
              onChange={(e) => setLocationId(Number(e.target.value))}
              className="w-full border border-gray-200 shadow-sm p-2 rounded bg-card text-text"
            >
              <option value="" disabled>
                Select Location
              </option>
              {locations.map((location) => (
                <option key={location.locationId} value={location.locationId}>
                  {"#" +
                    location.locationId +
                    " " +
                    location.city +
                    "/" +
                    location.country.countryName}
                </option>
              ))}
            </select>
            <button
              className="
              group
              flex items-center gap-1
              text-xs font-medium
            text-green-600
            hover:text-green-700
              transition-colors duration-200
              cursor-pointer"
              onClick={onLocationPopup}
            >
              <CirclePlus
                className="transition-transform duration-200 group-hover:scale-110"
                size={16}
              />
              <span
                className="
                relative
                after:absolute after:left-0 after:-bottom-0.5
                after:h-px after:w-0
                after:bg-green-700
                after:transition-all after:duration-200
                group-hover:after:w-full
              "
              >
                Create new location
              </span>
            </button>
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-2 rounded mt-4"
            >
              Save
            </button>
          </div>
        </aside>
      )}
      {mode === "add" && (
        <aside className="fixed top-0 right-0 h-screen w-96 bg-surface border-l shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-text font-semibold">
              Create New Location
            </h2>
            <button className="text-text" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <p className="mt-4 text-text">
              <span className="text-red-600 font-semibold">*</span>Department
              Name:{" "}
            </p>
            <input
              value={departmentName}
              onChange={(e) => {
                setDepartmentName(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  departmentName:
                    !e.target.value.trim() || e.target.value.length > 255
                      ? prev.departmentName
                      : undefined,
                }));
              }}
              className="w-full border border-gray-200 bg-card shadow-sm text-text p-2 rounded"
            />
            {errors.departmentName && (
              <p className="text-sm text-red-600">{errors.departmentName}</p>
            )}

            <p className="text-text mt-4">
              <span className="text-red-600 font-semibold">*</span>Location:{" "}
            </p>
            <select
              value={locationId}
              onChange={(e) => {
                setLocationId(Number(e.target.value));
                setErrors((prev) => ({
                  ...prev,
                  locationId: !e.target.value ? prev.locationId : undefined,
                }));
              }}
              className="w-full border border-gray-200 p-2 shadow-sm rounded bg-card text-text"
            >
              <option value="0" disabled>
                Select Location
              </option>
              {locations.map((location) => (
                <option key={location.locationId} value={location.locationId} >
                  {"#" +
                    location.locationId +
                    " " +
                    location.city +
                    "/" +
                    location.country.countryName}
                </option>
              ))}
            </select>
            <button
              className="
              group
              flex items-center gap-1
              text-xs font-medium
            text-green-600
            hover:text-green-700
              transition-colors duration-200
              cursor-pointer"
              onClick={onLocationPopup}
            >
              <CirclePlus
                className="transition-transform duration-200 group-hover:scale-110"
                size={16}
              />
              <span
                className="
                relative
                after:absolute after:left-0 after:-bottom-0.5
                after:h-px after:w-0
                after:bg-green-700
                after:transition-all after:duration-200
                group-hover:after:w-full
              "
              >
                Create new location
              </span>
            </button>
            {errors.locationId && (
              <p className="text-sm text-red-600">{errors.locationId}</p>
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

export default DepartmentEditSidebar;
