import type { UltraLightDepartment } from "../Department/DepartmentInterface";
import type { Job } from "../Job/JobInterface";
import type { ManagerLight } from "./ManagerInterface";


export interface EmployeeRequest{
    file?: File | null;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    salary?: number;
    hireDate?: string;
    jobId?: string;
    departmentId?: number;
    managerId?: number | null;
    removeManagerId?: boolean;
    isManager?: boolean;
    subordinateIds?: number[];
}

export interface EmployeeLight{
    employeeId: number;
    fileUrl: string;
    firstName?: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    salary?: number;
    hireDate: string;
    managerId?: number | null;
    job: Job;
    department: UltraLightDepartment;
    isManager: boolean;
}



export interface EmployeeUltraLight{
    employeeId: number;
    fileUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    hireDate: string;
    isManager: boolean;
}


export interface EmployeeDetail{
    employeeId: number;
    fileUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    salary: number;
    hireDate: string;
    manager: ManagerLight;
    isManager: boolean;
    job: Job;
    department: UltraLightDepartment;
    subordinates: EmployeeLight[];
    createdAt: string; // ISO - 8601
    updatedAt: string; // ISO - 8601
}

export interface EmployeeFilter{
    search?: string;
    departmentId?: number;
    jobTitle?: string;
    managerId?: number;
    isManager?: boolean;
    sorts?: SortItem[];
}

export type SortDirection = "ASC" | "DESC";
export type SortField = "HIRE_DATE" | "SALARY" | "UPDATED_AT";
type SortItem = {
  field: SortField,
  direction: string;
}