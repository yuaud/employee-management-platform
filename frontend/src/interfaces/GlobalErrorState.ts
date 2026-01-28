export type ErrorState = {
    message: string;
    status?: number;
    type: "error" | "success";
} | null;