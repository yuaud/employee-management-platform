import type { EmployeeUltraLight } from "../Employee/EmployeeInterface";

export interface Job{
    jobId: string;
    jobTitle: string;
    createdAt: string;
    updatedAt: string;
    employeeCount: number;
}

export interface JobDetail{
    jobId: string;
    jobTitle: string;
    createdAt: string;
    updatedAt: string;
    employeeCount: number;
    employees: EmployeeUltraLight[];
}

export interface JobFilter{
    search?: string;
    sort?: SortItem;
}

export type SortDirection = "ASC" | "DESC";
export type SortField = "UPDATED_AT";
type SortItem = {
  field: SortField,
  direction: string;
}