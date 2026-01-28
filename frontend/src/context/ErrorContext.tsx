import { createContext, useContext, useEffect, useState } from "react";
import type { ErrorState } from "../interfaces/GlobalErrorState";

const ErrorContext = createContext<{
    error: ErrorState;
    setError: (e: ErrorState) => void;
}>({
    error: null,
    setError: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
    const [error, setError] = useState<ErrorState>(null);

    // api-error event listener, only for api errors (not successes only errors)
    useEffect(() => {
        const handler = (e: any) => {
            setError({
                message: e.detail.message,
                status: e.detail.status,
                type: e.detail.type,
            });
        };
        window.addEventListener("api-error", handler);
        return () => window.removeEventListener("api-error", handler);
    }, []);

    // error timer
    useEffect(() => {
        if(!error) return;
        const timer = setTimeout(() => {
            setError(null);
        }, error.type === "error" ? 5000 : 3000);
        return () => clearTimeout(timer); 
    }, [error]);

    return(
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);