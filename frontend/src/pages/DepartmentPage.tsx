import { ArrowDown, ArrowUp, BrushCleaning, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import type { Department, DepartmentFilter, DepartmentRequest, LightDepartment, SortField } from "../interfaces/Department/DepartmentInterface";
import { createDepartment, deleteDepartment, filterDepartments, getAllDepartments, getDepartmentById, updateDepartment } from "../services/departmentService";
import { DepartmentCardList } from "../components/DepartmentComponents/DepartmentCardList";
import type { Location, LocationRequest } from "../interfaces/Location/LocationInterface";
import { createLocation, getLocations } from "../services/locationService";
import DepartmentEditSidebar from "../components/DepartmentComponents/DepartmentEditSidebar";
import DepartmentDetailPopup from "../components/DepartmentComponents/DepartmentDetailPopup";
import LocationCreatePopup from "../components/LocationComponents/LocationCreatePopup";
import type { Country } from "../interfaces/CountryInterface";
import { getCountries } from "../services/countryService";
import { Pagination } from "../components/LayoutComponents/Pagination";

type Mode = "add" | "edit";

const DepartmentPage = () => {
  const [filters, setFilters] = useState<DepartmentFilter>({});
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [departments, setDepartments] = useState<LightDepartment[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<LightDepartment | null>(null);
  const [detailedDepartment, setDetailedDepartment] = useState<Department | null>(null);
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  
  const [mode, setMode] = useState<Mode>("add");

  useEffect(() => {
    getAllDepartments().then((departments) => setDepartments(departments));
    getLocations().then((locations) => setLocations(locations));
    getCountries().then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    filterDepartments(filters, page, 12).then((page) => {
      setDepartments(page.content);
      setTotalPages(page.totalPages);
    })
  }, [filters, page]);

  const handleSubmit = async(department: DepartmentRequest) => {
    try{
      if(mode === "add"){
        await createDepartment(department);
        await filterDepartments(filters, page, 12).then((page) => setDepartments(page.content));
      }
      else if(mode === "edit" && selectedDepartment){
        await updateDepartment(selectedDepartment.departmentId, department);
        await filterDepartments(filters, page, 12).then((page) => setDepartments(page.content));
      }
      setIsEditOpen(false);
      setSelectedDepartment(null);
    } catch(err: unknown){
      console.error("error: ", err);
    }
  }

  const handleEditSidebarLocationPopup = () => {
    setIsLocationPopupOpen(true);
  }

  const handleLocationPopup = async(location: LocationRequest) => {
    const createdLocation = await createLocation(location);
    setLocations(prev => [createdLocation, ...prev]);
    setIsLocationPopupOpen(false);
  }

  const handleInfo = async (department: LightDepartment) => {
    const detailedDep = await getDepartmentById(department.departmentId);
    setDetailedDepartment(detailedDep);
    setIsInfoOpen(true);
  }

  const handleEdit = (department: LightDepartment) => {
    setSelectedDepartment(department);
    setIsEditOpen(true);
    setMode("edit");
  };
  
  const handleDelete = async (department: LightDepartment) => {
    await deleteDepartment(department.departmentId);
    await filterDepartments(filters, page, 12).then((page) => setDepartments(page.content));
  }

    const toggleSort = (field: SortField) => {
      setFilters((p) => {
        const sort = p.sort;
        let nextSort;
        if (!sort || sort.field !== field) {
          // sort yok ya da baska field var ilk atama DESC
          nextSort = { field, direction: "DESC" };
        } else if (sort.direction === "DESC") {
          nextSort = { field, direction: "ASC" };
        } else {
          nextSort = undefined;
        }
        return {
          ...p,
          sort: nextSort,
        };
      });
    };

  return (
    <div className="h-full flex flex-col">
      <div className="flex mx-auto justify-between mb-4 w-2/4">
        <p className="font-semibold text-2xl mb-2 text-text">DEPARTMENTS</p>
        <button
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded"
          onClick={() => {
            setMode("add");
            setSelectedDepartment(null);
            setIsEditOpen(true);
          }}
        >
          <CirclePlus />
          Create new Department
        </button>
      </div>
      <div className="rounded-lg border w-2/4 mx-auto border-gray-200 bg-card p-4 shadow-sm mb-8">
        <div className="grid grid-cols-[repeat(2,1fr)_auto] gap-4 items-end text-sm">
          {/* Department Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Department Name</label>
            <input
              type="text"
              className="border rounded px-2 py-1 bg-card text-text"
              value={filters.departmentName ?? ""}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  departmentName: e.target.value || undefined,
                }))
              }
            />
          </div>
          {/* Location */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Location</label>
            <select
              value={filters.locationId ?? ""}
              className="border rounded px-2 py-1 bg-card text-text"
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  locationId: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                }))
              }
            >
              <option value="">All Locations</option>
              {locations.map((l) => (
                <option key={l.locationId} value={l.locationId}>
                  #{l.locationId} - {l.city} / {l.country.countryName}
                </option>
              ))}
            </select>
          </div>
          {/* Clear Button */}
          <div className="flex items-end">
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition"
              title="Clear filters"
              onClick={() => setFilters({})}
            >
              <BrushCleaning size={16} />
            </button>
          </div>
        </div>
        {/* Updated At Button */}
        <div className="mt-4 flex justify-center text-gray-500">
          <button
            className="flex items-center gap-2 border-b px-3 py-1"
            onClick={() => toggleSort("UPDATED_AT")}
          >
            Updated At
            {filters.sort?.direction === "ASC" && (
              <ArrowUp size={16} color="green" />
            )}
            {filters.sort?.direction === "DESC" && (
              <ArrowDown size={16} color="red" />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1">
        <DepartmentCardList departments={departments} onInfo={handleInfo} onEdit={handleEdit} onDelete={handleDelete}/>
      </div>
        {isEditOpen && (
          <DepartmentEditSidebar
          key={mode === "edit" ? selectedDepartment?.departmentId : "add"}
          mode={mode}
          department={selectedDepartment}
          locations={locations}
          onLocationPopup={handleEditSidebarLocationPopup}
          onSubmit={handleSubmit}
          onClose={() => setIsEditOpen(false)}
          />
        )}
        {isLocationPopupOpen && (
          <LocationCreatePopup
          countries={countries}
          onSubmit={handleLocationPopup}
          onClose={() => setIsLocationPopupOpen(false)}
          />
        )}
        {isInfoOpen && detailedDepartment && (
          <DepartmentDetailPopup
          department={detailedDepartment}
          onClose={() => setIsInfoOpen(false)}
          />
        )}
        <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        />
    </div>
  );
};

export default DepartmentPage;
