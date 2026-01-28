
export interface JobHistory{
    jobHistoryId: number;
    employeeId: number;
    companyName: string;
    startDate: string;
    endDate: string;
    job: string;
}

export interface JobHistoryRequest{
    companyName?: string;
    startDate: string;
    endDate?: string;
    jobId: string;
}