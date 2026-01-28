import type { EmployeeUltraLight } from "../Employee/EmployeeInterface";
import type { LightLocation, Location } from "../Location/LocationInterface";

export interface UltraLightDepartment{
    departmentId: number;
    departmentName: string;
}

export interface LightDepartment {
    departmentId: number;
    departmentName: string;
    location: LightLocation;
    employeeCount: number;
}

export interface Department{
    departmentId: number;
    departmentName: string;
    location: Location;
    employees: EmployeeUltraLight[];
    employeeCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface DepartmentRequest{
    departmentName?: string;
    locationId?: number;
}

export interface DepartmentFilter{
    departmentName?: string;
    locationId?: number;
    sort?: SortItem;
}

export type SortDirection = "ASC" | "DESC";
export type SortField = "HIRE_DATE" | "SALARY" | "UPDATED_AT";
type SortItem = {
  field: SortField,
  direction: string;
}