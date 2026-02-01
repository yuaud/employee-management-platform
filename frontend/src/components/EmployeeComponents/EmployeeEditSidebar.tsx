import React, { useEffect, useMemo, useRef, useState } from "react";
import type { LightDepartment } from "../../interfaces/Department/DepartmentInterface";
import type { Job } from "../../interfaces/Job/JobInterface";
import type { EmployeeLight, EmployeeRequest } from "../../interfaces/Employee/EmployeeInterface";
import { PhoneInput } from "../InputControlledComponents/PhoneInput";
import { DateInput } from "../InputControlledComponents/DateInput";
import { SalaryInput } from "../InputControlledComponents/SalaryInput";
import { Toggle } from "../InputControlledComponents/Toggle";
import type { ManagerLight } from "../../interfaces/Employee/ManagerInterface";
import { ManagerDropdown } from "./ManagerDropDown";
import { SubordinateSelector } from "./SubordinateSelector";
import ImageDropzone from "./ImageDropZone";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  salary?: string;
  hireDate?: string;
  jobId?: string;
  departmentId?: string;
  managerId?: string;
};

type EmployeeEditSidebarProps = {
    mode: "add" | "edit";
    employee?: EmployeeLight | undefined | null;
    employees: EmployeeLight[];
    managers: ManagerLight[];
    jobs: Job[];
    departments: LightDepartment[];
    onClose: () => void;
    onSubmit: (employee: EmployeeRequest) => void;
}

const EmployeeEditSidebar = ({
    mode,
    employee,
    employees,
    managers,
    jobs,
    departments,
    onClose,
    onSubmit
}: EmployeeEditSidebarProps)  => {
    const [file, setFile] = useState<File | null>(null);
    const objectUrlRef = useRef<string | null>(null);

    const [photoUrl, setPhotoUrl] = useState<string>(employee?.fileUrl ?? "");
    const [firstName, setFirstName] = useState<string>(employee?.firstName ?? "");
    const [lastName, setLastName] = useState<string>(employee?.lastName ?? "");
    const [email, setEmail] = useState<string>(employee?.email ?? "");
    const [phoneNumber, setPhoneNumber] = useState<string>(employee?.phoneNumber ?? "");
    const [salaryInput, setSalaryInput] = useState<string>(employee?.salary != null ? employee.salary.toFixed(2) : "");
    const [hireDate, setHireDate] = useState<string>(employee?.hireDate ?? "");
    const [jobId, setJobId] = useState<string>(employee?.job.jobId ?? "0");
    const [departmentId, setDepartmentId] = useState<number>(employee?.department.departmentId ?? 0);
    const [isManager, setIsManager] = useState<boolean>(employee?.isManager ?? false);
    const [managerId, setManagerId] = useState<number | null>(employee?.managerId ?? null);
    const [selectedSubordinateIds, setSelectedSubordinateIds] = useState<number[]>(() => {
      if(!employee) return [];
      return employees.filter((e) => e.managerId === employee.employeeId)
      .map((s) => s.employeeId) ?? []
    });

    // validating if subordinates changed in update
    const registeredSubordinateIds = useMemo(() => {
      if (!employee) return [];
      return employees
        .filter(e => e.managerId === employee.employeeId)
        .map(e => e.employeeId);
    }, [employees, employee]);



    // manageri null olan employee'leri listelemek için
    const [onlyManagerless, setOnlyManagerless] = useState<boolean>(false);
    
    const [errors, setErrors] = useState<FormErrors>({});

    const filteredEmployees = useMemo(() => {
      if(!onlyManagerless) return employees;
      return employees.filter((e) => 
        e.managerId == null ||
        selectedSubordinateIds.includes(e.employeeId)
      );
    }, [employees, onlyManagerless, selectedSubordinateIds]);

    const filteredManagers = useMemo(() => {
      if (!employee) return managers;
      return managers.filter(
        (m) => m.employeeId !== employee.employeeId
      );
    }, [managers, employee]);

    /* Component unmount olduğunda belleği temizle */
    useEffect(() => {
        return () => {
            if(objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        }
    }, []); 

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (mode === "add") {
            if(firstName.length > 100){
                newErrors.firstName = "First Name must be less than 100 characters";
            }
            if(!lastName.trim()){
                newErrors.lastName = "Last Name cannot be empty";
            } else if(lastName.length > 100){
                newErrors.lastName = "Last Name must be less than 100 characters"
            }
            if(!email.trim()){
                newErrors.email = "Email cannot be empty"
            } else if(email.length > 255){
                newErrors.email = "Email must be less than 255 characters";
            }
            if(salaryInput !== "" && Number(salaryInput) < 0){
                newErrors.salary = "Salary must be 0 or Positive";
            }
            if(!hireDate.trim()){
                newErrors.hireDate = "Hire Date cannot be empty";
            }
            if (jobId === "0" || !jobId.trim()) {
                newErrors.jobId = "Job cannot be empty";
            }
            if (departmentId === 0) {
                newErrors.departmentId = "Department cannot be empty";
            }
        }
        if (mode === "edit") {
            const changed = {
            firstName: firstName !== employee?.firstName,
            lastName: lastName !== employee?.lastName,
            email: email !== employee?.email,
            salary: salaryInput !== employee?.salary?.toFixed(2),
            hireDate: hireDate !== employee?.hireDate,
            jobId: jobId !== employee?.job.jobId,
            departmentId: departmentId !== employee?.department.departmentId,
            isManager: isManager !== employee?.isManager
            };

            if(changed.firstName && firstName.length > 100){
                newErrors.firstName = "First Name must be less than 100 characters";
            }
            if(changed.lastName && !lastName.trim()){
                newErrors.lastName = "Last Name cannot be empty";
            } else if(changed.lastName && lastName.length > 100){
                newErrors.lastName = "Last Name must be less than 100 characters"
            }
            if(changed.email && !email.trim()){
                newErrors.email = "Email cannot be empty"
            } else if(changed.email && email.length > 255){
                newErrors.email = "Email must be less than 255 characters";
            }
            if(changed.salary && (salaryInput !== "" && Number(salaryInput) < 0)){
                newErrors.salary = "Salary must be 0 or Positive";
            }
            if(changed.hireDate && !hireDate.trim()){
                newErrors.hireDate = "Hire Date cannot be empty";
            }
            if (changed.jobId && (jobId === "0" || !jobId.trim())) {
                newErrors.jobId = "Job cannot be empty";
            }
            if (changed.departmentId && departmentId === 0) {
                newErrors.departmentId = "Department cannot be empty";
            }
        }
        
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {        
        if(!validate()) return;
        
        if(mode === "add"){
            onSubmit(buildAddPayload());
        } else {
            onSubmit(buildEditPayload());
        }
        onClose();
    }

    const buildAddPayload = (): EmployeeRequest => {
        return {
            file,
            firstName,
            lastName,
            email,
            phoneNumber,
            salary: salaryInput === "" ? 0 : Number(salaryInput),
            hireDate,
            jobId,
            departmentId,
            managerId,
            isManager,
            subordinateIds: selectedSubordinateIds
        };
    };
    const buildEditPayload = (): Partial<EmployeeRequest> => {
        const payload: Partial<EmployeeRequest> = {};
        if (file) payload.file = file;
        if (firstName !== employee?.firstName) {
            payload.firstName = firstName;
        }
        if (lastName !== employee?.lastName) {
            payload.lastName = lastName;
        }
        if (email !== employee?.email) {
            payload.email = email;
        }
        if (phoneNumber !== employee?.phoneNumber) {
            payload.phoneNumber = phoneNumber;
        }
        if (
            salaryInput !== "" &&
            salaryInput !== employee?.salary?.toFixed(2)
        ) {
            payload.salary = Number(salaryInput);
        }
        if (hireDate !== employee?.hireDate) {
            payload.hireDate = hireDate;
        }
        if (jobId !== employee?.job.jobId) {
            payload.jobId = jobId;
        }
        if (departmentId !== employee?.department.departmentId) {
            payload.departmentId = departmentId;
        }
        payload.isManager = isManager;
        const originalManagerId = employee?.managerId ?? null;
        if(originalManagerId !== null && managerId === null){
          payload.removeManagerId = true;
        }
        else if(managerId !== originalManagerId){
          payload.managerId = managerId;
        }
        const equalAsSet = (a: number[], b: number[]) => {
          if (a.length !== b.length) return false;
          const set = new Set(a);
          return b.every(id => set.has(id));
        };
        if (!equalAsSet(registeredSubordinateIds, selectedSubordinateIds)) {
          payload.subordinateIds = selectedSubordinateIds;
        }
        return payload;
    };


    const handleFileChange = (file: File | null) => {
        setFile(file);
        if(!file) return;
        /* RAM şişmemesi için önceki url'yi bellekten kaldır */
        if(file){
            if(objectUrlRef.current){
                URL.revokeObjectURL(objectUrlRef.current);
            }
            const objectUrl = URL.createObjectURL(file);
            objectUrlRef.current = objectUrl;
            setPhotoUrl(objectUrl);
        }
    }

  return (
    (
    <>
{mode === "edit" && (
<aside className="fixed top-0 right-0 h-screen w-96 bg-surface border-l border-gray-500 shadow-lg p-4 flex flex-col">

  <div className="flex justify-between items-center mb-3 shrink-0">
    <h2 className="text-base text-text font-semibold">
      Edit Employee: #{employee?.employeeId}
    </h2>
    <button className="text-text hover:text-accent hover:cursor-pointer font-extrabold" onClick={onClose}>✕</button>
  </div>

  <div className="flex-1 overflow-y-auto min-h-0">
    <div className="grid grid-cols-2 gap-2 relative">
    {/* Avatar */}
    <div className="col-span-2 flex flex-col items-center gap-1 mb-2">
      <div className="w-28 h-28 mb-2 rounded-full border border-gray-300 bg-gray-100 overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${employee?.firstName} ${employee?.lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-text">
            {employee?.firstName?.charAt(0)}
            {employee?.lastName?.charAt(0)}
          </div>
        )}
      </div>

      <ImageDropzone onFile={(file) => handleFileChange(file)} />
    </div>

    {/* First Name */}
    <div>
      <label className="block text-xs text-text mb-0.5">First Name</label>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full border border-gray-200 p-1.5 rounded text-text bg-card"
      />
      {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
    </div>

    {/* Last Name */}
    <div>
      <label className="block text-xs text-text mb-0.5">Last Name</label>
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full border border-gray-200 p-1.5 rounded text-text bg-card"
      />
      {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
    </div>

    {/* Email */}
    <div className="col-span-2">
      <label className="block text-xs text-text mb-0.5">Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-200 p-1.5 rounded text-text bg-card"
      />
      {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
    </div>

    {/* Phone */}
    <div className="col-span-2">
      <label className="block text-xs text-text mb-0.5">Phone</label>
      <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />
      {errors.phoneNumber && <p className="text-xs text-red-600">{errors.phoneNumber}</p>}
    </div>

    {/* Salary */}
    <div>
      <label className="block text-xs text-text mb-0.5">Salary</label>
      <SalaryInput value={salaryInput} onChange={setSalaryInput} />
      {errors.salary && <p className="text-xs text-red-600">{errors.salary}</p>}
    </div>

    {/* Hire Date */}
    <div>
      <label className="block text-xs text-text mb-0.5">Hire Date</label>
      <DateInput value={hireDate} onChange={setHireDate} />
      {errors.hireDate && <p className="text-xs text-red-600">{errors.hireDate}</p>}
    </div>

    {/* Job */}
    <div className="col-span-2">
      <label className="block text-xs text-text mb-0.5">Job</label>
      <select
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
        className="w-full border border-gray-200 p-1.5 rounded bg-card text-text"
      >
        <option value="0" disabled>Select Job</option>
        {jobs.map((job: Job) => (
          <option key={job.jobId} value={job.jobId}>
            {job.jobTitle}
          </option>
        ))}
      </select>
      {errors.jobId && <p className="text-xs text-red-600">{errors.jobId}</p>}
    </div>

    {/* Department */}
    <div className="col-span-2">
      <label className="block text-xs text-text mb-0.5">Department</label>
      <select
        value={departmentId}
        onChange={(e) => setDepartmentId(Number(e.target.value))}
        className="w-full border border-gray-200 p-1.5 rounded bg-card text-text"
      >
        <option value="0" disabled>Select Department</option>
        {departments.map((d: LightDepartment) => (
          <option key={d.departmentId} value={d.departmentId}>
            {d.departmentName}
          </option>
        ))}
      </select>
      {errors.departmentId && <p className="text-xs text-red-600">{errors.departmentId}</p>}
    </div>

    {/* Manager Select */}
    <ManagerDropdown
      managers={filteredManagers}
      managerId={managerId}
      setManagerId={setManagerId}
    />

    {/* Manager Toggle */}
    <div className="col-span-2 flex items-center justify-between mt-1">
      <span className="text-text font-medium">Manager</span>
      <Toggle value={isManager} onChange={setIsManager} />
    </div>

    {/* isManager === TRUE -> Subordinates */}
    {isManager && (
      <div className="mt-4 pt-3 col-span-2 flex-1 flex flex-col w-full min-h-0">
        <p className="text-sm font-semibold text-text mb-2 shrink-0">
          Subordinates
        </p>
        <div className="col-span-2 flex items-center justify-between mt-1 mb-2">
          <span className="text-text font-medium">Managerless Employees</span>
          <Toggle value={onlyManagerless} onChange={setOnlyManagerless} />
        </div>
        <div className="flex-1 w-full min-h-0 ">
        <SubordinateSelector
        employees={filteredEmployees}
        value={selectedSubordinateIds}
        onChange={setSelectedSubordinateIds}
        currentEmployeeId={employee?.employeeId}
        />
        </div>
      </div>
    )}

    {/* Save */}
    <div className="col-span-2 mt-2">
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-1.5 rounded text-sm"
      >
        Save
      </button>
    </div>

    </div>
  </div>
</aside>


)}

  {mode === "add" && (
  <aside className="fixed top-0 right-0 h-screen w-96 bg-surface shadow-lg p-4 text-text overflow-y-auto">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-base font-semibold">Create New Employee</h2>
      <button onClick={onClose}>✕</button>
    </div>

    <div className="grid grid-cols-2 gap-2 relative">

      {/* Avatar */}
      <div className="col-span-2 flex flex-col items-center gap-1 mb-2">
        <div className="w-28 h-28 mb-2 rounded-full border border-gray-300 bg-gray-100 overflow-hidden">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Employee"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm font-semibold">
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </div>
          )}
        </div>

        <ImageDropzone onFile={(file) => handleFileChange(file)} />
      </div>

      {/* First Name */}
      <div>
        <label className="block text-xs mb-0.5">First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border border-gray-200 p-1.5 rounded bg-card"
        />
        {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-xs mb-0.5">
          <span className="text-red-600">*</span> Last Name
        </label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border border-gray-200 p-1.5 rounded bg-card"
        />
        {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
      </div>

      {/* Email */}
      <div className="col-span-2">
        <label className="block text-xs mb-0.5">
          <span className="text-red-600">*</span> Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 p-1.5 rounded bg-card"
        />
        {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div className="col-span-2">
        <label className="block text-xs mb-0.5">Phone</label>
        <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />
        {errors.phoneNumber && <p className="text-xs text-red-600">{errors.phoneNumber}</p>}
      </div>

      {/* Salary */}
      <div>
        <label className="block text-xs mb-0.5">Salary</label>
        <SalaryInput value={salaryInput} onChange={setSalaryInput} />
        {errors.salary && <p className="text-xs text-red-600">{errors.salary}</p>}
      </div>

      {/* Hire Date */}
      <div>
        <label className="block text-xs mb-0.5">
          <span className="text-red-600">*</span> Hire Date
        </label>
        <DateInput value={hireDate} onChange={setHireDate} />
        {errors.hireDate && <p className="text-xs text-red-600">{errors.hireDate}</p>}
      </div>

      {/* Job */}
      <div className="col-span-2">
        <label className="block text-xs mb-0.5">
          <span className="text-red-600">*</span> Job
        </label>
        <select
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          className="w-full border border-gray-200 p-1.5 rounded bg-card"
        >
          <option value="0" disabled>Select Job</option>
          {jobs.map((job: Job) => (
            <option key={job.jobId} value={job.jobId}>
              {job.jobTitle}
            </option>
          ))}
        </select>
        {errors.jobId && <p className="text-xs text-red-600">{errors.jobId}</p>}
      </div>

      {/* Department */}
      <div className="col-span-2">
        <label className="block text-xs mb-0.5">
          <span className="text-red-600">*</span> Department
        </label>
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(Number(e.target.value))}
          className="w-full border border-gray-200 p-1.5 rounded bg-card"
        >
          <option value="0" disabled>Select Department</option>
          {departments.map((d: LightDepartment) => (
            <option key={d.departmentId} value={d.departmentId}>
              {d.departmentName}
            </option>
          ))}
        </select>
        {errors.departmentId && <p className="text-xs text-red-600">{errors.departmentId}</p>}
      </div>

      {/* Manager Select */}
      <ManagerDropdown
        managers={filteredManagers}
        managerId={managerId}
        setManagerId={setManagerId}
      />

      {/* Manager */}
      <div className="col-span-2 flex items-center justify-between mt-1">
        <span className="text-base font-medium">Manager</span>
        <Toggle value={isManager} onChange={setIsManager} />
      </div>

      {/* isManager === TRUE -> Subordinates */}
      {isManager && (
        <div className="mt-4 pt-3 col-span-2 flex-1 flex flex-col w-full min-h-0">
          <p className="text-sm font-semibold text-text mb-2 shrink-0">
            Subordinates
          </p>
          <div className="col-span-2 flex items-center justify-between mt-1 mb-2">
            <span className="text-text font-medium">Managerless Employees</span>
            <Toggle value={onlyManagerless} onChange={setOnlyManagerless} />
          </div>
          <div className="flex-1 w-full min-h-0 ">
          <SubordinateSelector
          employees={filteredEmployees}
          value={selectedSubordinateIds}
          onChange={setSelectedSubordinateIds}
          currentEmployeeId={employee?.employeeId}
          />
          </div>
        </div>
      )}

      {/* Create */}
      <div className="col-span-2 mt-2">
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-1.5 rounded text-sm"
        >
          Create
        </button>
      </div>

    </div>
  </aside>
  )}

    </>
    )
  )
}

export default EmployeeEditSidebar