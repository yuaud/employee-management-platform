import axios from "axios";
import type { EmployeeDetail, EmployeeFilter, EmployeeLight, EmployeeRequest } from "../interfaces/Employee/EmployeeInterface";
import { extractErrorMessage } from "../utility/extractErrorMessage";
import type { ManagerLight } from "../interfaces/Employee/ManagerInterface";
import type { Page } from "../interfaces/PageInterface";
import api from "./axiosInterceptor";

const API_URL = "/employees";

export const getAllEmployees = async (): Promise<EmployeeLight[]> => {
    try{
        const response = await api.get(API_URL);
        return response.data as EmployeeLight[];
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, "Exception while fetching employees"),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            )
        }
        throw err;
    }
}

export const filterEmployees = async (filters: EmployeeFilter, page: number, size: number): Promise<Page<EmployeeLight>> => {
    try{
        const body = Object.fromEntries(
            Object.entries(filters).filter(
                ([v]) => v !== undefined && v !== null && v !== ""
            )
        );
        const response = await api.post(`${API_URL}/filter?page=${page}&size=${size}`, body);
        return response.data as Page<EmployeeLight>;
    }catch(err: unknown) {
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, "Exception while fetching employees"),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            )
        }
        throw err;
    }
}

export const getEmployeeById = async (employeeId: number): Promise<EmployeeDetail> => {
    try{
        const response = await api.get(`${API_URL}/${employeeId}`);
        console.log(response.data);
        
        return response.data as EmployeeDetail;
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, `Exception while fetching employee: #${employeeId}`),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}

export const createEmployee = async (employee: EmployeeRequest): Promise<EmployeeDetail> => {
    const formData = new FormData();
    formData.append(
        "request", new Blob([JSON.stringify(employee)], {
            type: "application/json"
        })
    );
    if(employee.file){
        formData.append("file", employee.file);
    }
    try{
        const response = await api.post(
            API_URL, 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        window.dispatchEvent(
            new CustomEvent("api-error", {
                detail:{
                    message: "Employee successfully created",
                    status: 201,
                    type: "success"
                }
            })
        );
        return response.data as EmployeeDetail;
    }catch(err: unknown){
        
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, "Exception while creating Employee"),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}

export const updateEmployee = async (employeeId: number, employee: EmployeeRequest): Promise<EmployeeDetail> => {
    const formData = new FormData();
    formData.append(
        "request",
        new Blob([JSON.stringify(employee)], {
            type: "application/json",
        })
    );
    if(employee.file){
        formData.append(
            "file", employee.file
        )
    }
    try{
        const response = await api.put(
            `${API_URL}/${employeeId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        window.dispatchEvent(
            new CustomEvent("api-error", {
                detail:{
                    message: `Employee: #${employeeId} successfully updated`,
                    status: 200,
                    type: "success"
                }
            })
        );
        return response.data as EmployeeDetail;
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, `Exception while updating employee: #${employeeId}`),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}





export const deleteEmployeeById = async (employeeId: number) => {
    try{
        await api.delete(`${API_URL}/${employeeId}`);
        window.dispatchEvent(
            new CustomEvent("api-error", {
                detail: {
                    message: `#${employeeId} successfully deleted`,
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
                        message: extractErrorMessage(err, `Exception while fetching employee: #${employeeId}`),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}

export const getAllManagers = async (): Promise<ManagerLight[]> => {
    try{
        const response = await api.get(API_URL+"/managers");
        return response.data as ManagerLight[];
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, "Exception while fetching managers"),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            )
        }
        throw err;
    }
}