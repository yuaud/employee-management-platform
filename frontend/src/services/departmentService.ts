import axios from "axios";
import type { Department, DepartmentFilter, DepartmentRequest, LightDepartment } from "../interfaces/Department/DepartmentInterface";
import { extractErrorMessage } from "../utility/extractErrorMessage";
import type { Page } from "../interfaces/PageInterface";
import api from "./axiosInterceptor";

const API_URL = "/departments";

export const getAllDepartments = async (): Promise<LightDepartment[]> => {
    try{
        const response = await api.get(API_URL);
        return response.data as LightDepartment[];
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail: {
                        message: extractErrorMessage(err, "Exception while fetching departments"),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}

export const filterDepartments = async (filters: DepartmentFilter, page: number, size: number): Promise<Page<LightDepartment>> => {
    try{
        const body = Object.fromEntries(
            Object.entries(filters).filter(
                ([v]) => v !== undefined && v !== null && v !== "",
            ),
        );
        const response = await api.post(`${API_URL}/filter?page=${page}&size=${size}`, body);
        return response.data as Page<LightDepartment>;
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail: {
                        message: extractErrorMessage(err, "Exception while fetching departments"),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}

export const getDepartmentById = async (departmentId: number): Promise<Department> => {
    try{
        const response = await api.get(`${API_URL}/${departmentId}`);
        return response.data as Department;
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, `Exception while fetching department: #${departmentId}`),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}

export const createDepartment = async (department: DepartmentRequest): Promise<LightDepartment> => {
    try{
        const response = await api.post(API_URL, {
            departmentName: department.departmentName,
            locationId: department.locationId
        });
        window.dispatchEvent(
            new CustomEvent("api-error", {
                detail: {
                    message: `Department successfully created`,
                    status: 200,
                    type: "success"
                }
            })
        );
        return response.data as LightDepartment;
    }catch(err:unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, `Exception while creating department`),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}

export const updateDepartment = async(departmentId: number, depaertment: DepartmentRequest): Promise<LightDepartment> => {
    try{
        const response = await api.put(`${API_URL}/${departmentId}`, {
            departmentName: depaertment.departmentName,
            locationId: depaertment.locationId
        });
        window.dispatchEvent(
            new CustomEvent("api-error", {
                detail: {
                    message: `#${departmentId} successfully updated`,
                    status: 200,
                    type: "success"
                }
            })
        );
        return response.data as LightDepartment; 
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, `Exception while creating department`),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}

export const deleteDepartment = async (departmentId: number) => {
    try{
        await api.delete(`${API_URL}/${departmentId}`);
        window.dispatchEvent(
            new CustomEvent("api-error", {
                detail: {
                    message: `#${departmentId} successfully deleted`,
                    status: 204,
                    type: "success"
                },
            })
        );
        return;
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, `Exception while deleting department: #${departmentId}`),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
} 