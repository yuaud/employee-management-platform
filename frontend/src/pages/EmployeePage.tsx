import { useEffect, useState } from "react";
import type {
  EmployeeDetail,
  EmployeeFilter,
  EmployeeLight,
  EmployeeRequest,
  SortField,
} from "../interfaces/Employee/EmployeeInterface";
import {
  createEmployee,
  deleteEmployeeById,
  filterEmployees,
  getAllManagers,
  getEmployeeById,
  updateEmployee,
} from "../services/employeeService";
import { EmployeeCardList } from "../components/EmployeeComponents/EmployeeCardList";
import type { Job } from "../interfaces/Job/JobInterface";
import type { LightDepartment } from "../interfaces/Department/DepartmentInterface";
import { getAllDepartments } from "../services/departmentService";
import { getJobs } from "../services/jobService";
import EmployeeEditSidebar from "../components/EmployeeComponents/EmployeeEditSidebar";
import { ArrowDown, ArrowUp, BrushCleaning, CirclePlus } from "lucide-react";
import type { ManagerLight } from "../interfaces/Employee/ManagerInterface";
import { EmployeeDetailModal } from "../components/EmployeeComponents/EmployeeDetailPopup";
import { Pagination } from "../components/LayoutComponents/Pagination";

type Mode = "add" | "edit";

const EmployeePage = () => {
  const [filters, setFilters] = useState<EmployeeFilter>({});
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [employees, setEmployees] = useState<EmployeeLight[]>([]);
  const [managers, setManagers] = useState<ManagerLight[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<LightDepartment[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeLight | null>(null);
  const [detailedEmployee, setDetailedEmployee] =
    useState<EmployeeDetail | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("add");

  useEffect(() => {
    getAllManagers().then((managers) => {
      setManagers(managers);
    });
    getJobs().then((jobs) => {
      setJobs(jobs);
    });
    getAllDepartments().then((departments) => {
      setDepartments(departments);
    });
  }, []);

  useEffect(() => {
    filterEmployees(filters, page, 12).then((page) => {
      setEmployees(page.content);
      setTotalPages(page.totalPages);
    });
  }, [filters, page]);

  const handleEdit = (employee: EmployeeLight) => {
    setSelectedEmployee(employee);
    setIsEditOpen(true);
    setMode("edit");
  };

  const handleInfo = async (employee: EmployeeLight) => {
    const detailedemp = await getEmployeeById(employee.employeeId);
    setDetailedEmployee(detailedemp);
    setIsInfoOpen(true);
  };

  const handleDelete = async (employee: EmployeeLight) => {
    await deleteEmployeeById(employee.employeeId);
    await filterEmployees(filters, page, 12).then((page) =>
      setEmployees(page.content),
    );
  };

  const handleSubmit = async (employeeRequest: EmployeeRequest) => {
    try {
      if (mode === "add") {
        //const createdEmployee =
        await createEmployee(employeeRequest);
        await filterEmployees(filters, page, 12).then((page) =>
          setEmployees(page.content),
        );
      } else if (mode === "edit" && selectedEmployee) {
        await updateEmployee(selectedEmployee.employeeId, employeeRequest);
        await filterEmployees(filters, page, 12).then((page) =>
          setEmployees(page.content),
        );
      }
    } catch (err: unknown) {
      console.error("", err);
    }
  };

  const toggleSort = (field: SortField) => {
    setFilters((p) => {
      const prevSorts = p.sorts ?? [];

      const existing = prevSorts.find((p) => p.field === field);

      let nextSorts;
      if (!existing) {
        // sort field yok, DESC olarak ekle
        nextSorts = [...prevSorts, { field, direction: "DESC" }];
      } else if (existing.direction === "DESC") {
        // DESC ise ASC yap
        nextSorts = prevSorts.map((s) =>
          s.field === field ? { ...s, direction: "ASC" } : s,
        );
      } else {
        // ASC ise kaldır
        nextSorts = prevSorts.filter((s) => s.field !== field);
      }
      return {
        ...p,
        sorts: nextSorts.length ? nextSorts : undefined,
      };
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex mx-auto justify-between mb-4 w-2/3">
        <p className="font-semibold text-2xl mb-2 text-text">EMPLOYEES</p>
        <button
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded"
          onClick={() => {
            setMode("add");
            setSelectedEmployee(null);
            setIsEditOpen(true);
          }}
        >
          <CirclePlus />
          Create new Employee
        </button>
        </div>
        <div className="rounded-lg border w-2/3 mx-auto border-gray-200 bg-card p-4 shadow-sm mb-8">
          <div className="grid grid-cols-[repeat(6,1fr)_auto] gap-4 items-end text-sm">
            {/* Search bar */}
            <div className="flex flex-col col-span-2 gap-1">
              <label className="text-xs text-gray-500">Search</label>
              <input
                type="text"
                placeholder="firstname, lastname, email"
                className="border rounded px-2 py-1 bg-card text-text"
                value={filters.search === undefined ? "" : filters.search}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    search: e.target.value ? e.target.value : undefined,
                  }))
                }
              />
            </div>
            {/* Department */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Department</label>
              <select
                value={
                  filters.departmentId === undefined ? "" : filters.departmentId
                }
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

            {/* Job */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Job</label>
              <select
                value={filters.jobTitle === undefined ? "" : filters.jobTitle}
                className="border rounded px-2 py-1 bg-card text-text"
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    jobTitle: e.target.value || undefined,
                  }))
                }
              >
                <option value="">All Jobs</option>
                {jobs.map((j) => (
                  <option key={j.jobId} value={j.jobTitle}>
                    {j.jobTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Manager (Reports To) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Reports To</label>
              <select
                value={filters.managerId === undefined ? "" : filters.managerId}
                className="border rounded px-2 py-1 bg-card text-text"
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    managerId: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
              >
                <option value="">Any Manager</option>
                {managers.map((m) => (
                  <option key={m.employeeId} value={m.employeeId}>
                    {m.firstName} {m.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Is Manager */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Role</label>
              <select
                value={
                  filters.isManager === undefined
                    ? ""
                    : filters.isManager
                      ? "true"
                      : "false"
                }
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    isManager:
                      e.target.value === ""
                        ? undefined
                        : e.target.value === "true",
                  }))
                }
                className="border rounded px-2 py-1 bg-card text-text"
              >
                <option value="">All Employees</option>
                <option value="true">Managers Only</option>
                <option value="false">Non-Managers</option>
              </select>
            </div>
            <div className="flex justify-self">
              <button
                className="
                flex items-center justify-center
                w-9 h-9
                rounded-full
                bg-blue-500
                text-white
                hover:bg-red-50 hover:text-red-600 hover:border-red-300
                transition
                "
                title="Clear filters"
                onClick={() => setFilters({})}
              >
                <BrushCleaning size={16} />
              </button>
            </div>
          </div>
          <div className="flex mt-2 gap-2 text-gray-500 w-full">
            <button
              className="flex-1 flex border-b justify-center items-center gap-2"
              onClick={() => toggleSort("HIRE_DATE")}
            >
              Hire Date
              {filters.sorts?.find(
                (s) => s.field === "HIRE_DATE" && s.direction === "ASC",
              ) && <ArrowUp size={16} color="green" />}
              {filters.sorts?.find(
                (s) => s.field === "HIRE_DATE" && s.direction === "DESC",
              ) && <ArrowDown size={16} color="red" />}
            </button>
            <button
              className="flex-1 flex border-b justify-center items-center"
              onClick={() => toggleSort("SALARY")}
            >
              Salary
              {filters.sorts?.find(
                (s) => s.field === "SALARY" && s.direction === "ASC",
              ) && <ArrowUp size={16} color="green" />}
              {filters.sorts?.find(
                (s) => s.field === "SALARY" && s.direction === "DESC",
              ) && <ArrowDown size={16} color="red" />}
            </button>
            <button
              className="flex-1 flex border-b justify-center items-center"
              onClick={() => toggleSort("UPDATED_AT")}
            >
              Updated
              {filters.sorts?.find(
                (s) => s.field === "UPDATED_AT" && s.direction === "ASC",
              ) && <ArrowUp size={16} color="green" />}
              {filters.sorts?.find(
                (s) => s.field === "UPDATED_AT" && s.direction === "DESC",
              ) && <ArrowDown size={16} color="red" />}
            </button>
          </div>
        </div>

      <div className="flex-1">
      <EmployeeCardList
        employees={employees}
        onInfo={handleInfo}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      </div>

      {isEditOpen && (
        <EmployeeEditSidebar
          key={mode === "edit" ? selectedEmployee?.employeeId : "add"}
          mode={mode}
          employee={selectedEmployee}
          employees={employees}
          managers={managers}
          departments={departments}
          jobs={jobs}
          onSubmit={handleSubmit}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      {isInfoOpen && detailedEmployee && (
        <EmployeeDetailModal
          employee={detailedEmployee}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
      
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      
      
    </div>
  );
};

export default EmployeePage;
