import type { UltraLightDepartment } from "../Department/DepartmentInterface";
import type { Job } from "../Job/JobInterface";

export interface ManagerLight {
    employeeId: number;
    fileUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    hireDate: string;
    job: Job;
    department: UltraLightDepartment
}