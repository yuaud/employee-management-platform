import axios from "axios";
import type { Job, JobDetail, JobFilter } from "../interfaces/Job/JobInterface";
import { extractErrorMessage } from "../utility/extractErrorMessage";
import type { Page } from "../interfaces/PageInterface";
import api from "./axiosInterceptor";

const API_URL = "/jobs";

export const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await api.get(API_URL);
    return response.data as Job[];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(err, "Exception while fetching Jobs"),
            status: err.response?.status,
            type: "error",
          },
        })
      );
    }

    throw err;
  }
};

export const filterJobs = async(filters: JobFilter, page: number, size: number): Promise<Page<Job>> => {
  try{
    const body = Object.fromEntries(
        Object.entries(filters).filter(
            ([v]) => v !== undefined && v !== null && v !== ""
        )
    );
    const response = await api.post(`${API_URL}/filter?page=${page}&size=${size}`, body);
    return response.data as Page<Job>;
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

export const getJobById = async (jobId: string): Promise<JobDetail> => {
  try {
    const response = await api.get(`${API_URL}/${jobId}`);
    return response.data as JobDetail;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(err, "Exception while fetching job by id"),
            status: err.response?.status,
            type: "error",
          },
        })
      );
    }

    throw err;
  }
};

export const updateJob = async (
  jobId: string,
  jobTitle: string
): Promise<Job> => {
  try {
    const response = await api.put(`${API_URL}/${jobId}`, {
      jobTitle: jobTitle,
    });
    window.dispatchEvent(
      new CustomEvent("api-error", {
        detail: {
          message: "Job successfully updated",
          status: 200,
          type: "success",
        },
      })
    );
    return response.data as Job;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(err, "Exception while updating job"),
            status: err.response?.status,
            type: "error",
          },
        })
      );
    }

    throw err;
  }
};

export const createJob = async (
  jobId: string,
  jobTitle: string
): Promise<Job> => {
  try {
    const response = await api.post(`${API_URL}`, {
      jobId: jobId,
      jobTitle: jobTitle,
    });
    window.dispatchEvent(
      new CustomEvent("api-error", {
        detail: {
          message: "Job successfully created",
          status: 201,
          type: "success",
        },
      })
    );
    return response.data as Job;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(err, "Exception while creating job"),
            status: err.response?.status,
            type: "error",
          },
        })
      );
    }

    throw err;
  }
};

export const deleteJob = async (jobId: string) => {
  try {
    await api.delete(`${API_URL}/${jobId}`);
    window.dispatchEvent(
      new CustomEvent("api-error", {
        detail: {
          message: `#${jobId} successfully deleted`,
          status: 200,
          type: "success",
        },
      })
    );
    return;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(err, `Exception while deleting job #${jobId}`),
            status: err.response?.status,
            type: "error",
          },
        })
      );
    }

    throw err;
  }
};
