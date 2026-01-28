import axios from "axios";
import { extractErrorMessage } from "../utility/extractErrorMessage";
import type { JobHistory, JobHistoryRequest } from "../interfaces/JobHistory/JobHistoryInterface";
import api from "./axiosInterceptor";

const API_URL = "/employees";

export const getAllJobHistory = async (employeeId: number): Promise<JobHistory[]> => {
    try{
        const response = await api.get(`${API_URL}/${employeeId}/job-history`);
        return response.data as JobHistory[];
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

export const createJobHistory = async (employeeId: number, request: JobHistoryRequest): Promise<JobHistory> => {
    try{
        const response = await api.post(`${API_URL}/${employeeId}/job-history`, request);
        window.dispatchEvent(
            new CustomEvent("api-error", {
                detail:{
                    message: "Job history successfully created",
                    status: 201,
                    type: "success"
                }
            })
        );
        return response.data as JobHistory;
    }catch(err: unknown){
        
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, "Exception while creating job history"),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}

export const deleteJobHistory = async (employeeId: number, jobHistoryId: number) => {
    try{
        await api.delete(`${API_URL}/${employeeId}/job-history/${jobHistoryId}`)
        window.dispatchEvent(
            new CustomEvent("api-error", {
                detail: {
                    message: "Job History successfully deleted",
                    status: 204,
                    type: "success"
                }
            })
        );
        return;
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail:{
                        message: extractErrorMessage(err, "Exception while deleting job history"),
                        status: err.response?.status,
                        type: "error"
                    }
                })
            );
        }
        throw err;
    }
}