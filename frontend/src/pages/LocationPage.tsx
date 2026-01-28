import { useEffect, useState } from "react";
import type {
  Location,
  LocationFilter,
  LocationRequest,
  SortField,
} from "../interfaces/Location/LocationInterface";
import {
  createLocation,
  deleteLocation,
  filterLocations,
  getLocationById,
  updateLocation,
} from "../services/locationService";
import { LocationCardList } from "../components/LocationComponents/LocationCardList";
import LocationEditSidebar from "../components/LocationComponents/LocationEditSidebar";
import type { Country } from "../interfaces/CountryInterface";
import { getCountries } from "../services/countryService";
import { ArrowDown, ArrowUp, BrushCleaning, CirclePlus } from "lucide-react";
import LocationDetailPopup from "../components/LocationComponents/LocationDetailPopup";
import type { LightDepartment } from "../interfaces/Department/DepartmentInterface";
import { getAllDepartments } from "../services/departmentService";
import { Pagination } from "../components/LayoutComponents/Pagination";

type Mode = "add" | "edit";

const LocationPage = () => {
  const [filters, setFilters] = useState<LocationFilter>({});
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [countries, setCountries] = useState<Country[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [departments, setDepartments] = useState<LightDepartment[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [detailedLocation, setDetailedLocation] = useState<Location | null>(
    null,
  );
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("add");

  useEffect(() => {
    getCountries().then((countries) => setCountries(countries));
    getAllDepartments().then((departments) => setDepartments(departments));
  }, []);

  useEffect(() => {
    filterLocations(filters, page, 8).then((page) => {
      setLocations(page.content);
      setTotalPages(page.totalPages);
    });
  }, [filters, page]);

  const handleInfo = async (location: Location) => {
    const detailedLoc = await getLocationById(location.locationId);
    setDetailedLocation(detailedLoc);
    setIsInfoOpen(true);
  };

  const handleEdit = (location: Location) => {
    setSelectedLocation(location);
    setIsEditOpen(true);
    setMode("edit");
  };

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

  const handleSubmit = async (location: LocationRequest) => {
    try {
      if (mode === "add") {
        await createLocation(location);
        await filterLocations(filters, page, 8).then((page) =>
          setLocations(page.content),
        );
      } else if (mode === "edit" && selectedLocation) {
        await updateLocation(selectedLocation.locationId, location);
        await filterLocations(filters, page, 8).then((page) =>
          setLocations(page.content),
        );
      }
      setIsEditOpen(false);
      setSelectedLocation(null);
    } catch (err: unknown) {
      console.error("error: ", err);
    }
  };
  const handleDelete = async (location: Location) => {
    await deleteLocation(location.locationId);
    await filterLocations(filters, page, 8).then((page) =>
      setLocations(page.content),
    );
  };
  return (
    <div className="h-full flex flex-col">
      <div className="flex mx-auto justify-between mb-4 w-2/3">
        <p className="font-semibold text-2xl mb-2 text-text">LOCATIONS</p>
        <button
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded"
          onClick={() => {
            setMode("add");
            setSelectedLocation(null);
            setIsEditOpen(true);
          }}
        >
          <CirclePlus />
          Create new Location
        </button>
      </div>
      <div className="rounded-lg border w-2/3 mx-auto border-gray-200 bg-card p-4 shadow-sm mb-8">
        {/* Grid Container */}
        <div className="grid grid-cols-[repeat(4,1fr)_auto] gap-4 items-end text-sm">
          {/* Country */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Country</label>
            <input
              type="text"
              placeholder="Country"
              className="border rounded px-2 py-1 bg-card text-text"
              value={filters.country ?? ""}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  country: e.target.value || undefined,
                }))
              }
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">City</label>
            <input
              type="text"
              placeholder="City"
              className="border rounded px-2 py-1 bg-card text-text"
              value={filters.city ?? ""}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  city: e.target.value || undefined,
                }))
              }
            />
          </div>

          {/* Postal Code */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              className="border rounded px-2 py-1 bg-card text-text"
              value={filters.postalCode ?? ""}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  postalCode: e.target.value || undefined,
                }))
              }
            />
          </div>

          {/* Department */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Department</label>
            <select
              value={filters.departmentId ?? ""}
              className="border rounded px-2 py-1 bg-card text-text"
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  departmentId: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                }))
              }
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.departmentId} value={d.departmentId}>
                  {d.departmentName}
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
        <LocationCardList
          locations={locations}
          onInfo={handleInfo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        </div>
        {isEditOpen && (
          <LocationEditSidebar
            key={mode === "edit" ? selectedLocation?.locationId : "add"}
            mode={mode}
            location={selectedLocation}
            countries={countries}
            onSubmit={handleSubmit}
            onClose={() => setIsEditOpen(false)}
          />
        )}
        {isInfoOpen && detailedLocation && (
          <LocationDetailPopup
            location={detailedLocation}
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

export default LocationPage;
