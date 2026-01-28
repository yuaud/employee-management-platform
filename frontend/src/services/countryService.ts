import axios from "axios";
import type { Country } from "../interfaces/CountryInterface";
import { extractErrorMessage } from "../utility/extractErrorMessage";
import api from "./axiosInterceptor";

const API_URL = "/locations/countries";

export const getCountries = async (): Promise<Country[]> => {
    try{
        const response = await api.get(API_URL);
        return response.data as Country[];
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail: {
                        message: extractErrorMessage(err, "Exception while fetching Countries"),
                        status: err.response?.status,
                        type: "error"
                    },
                })
            );
        }
        throw err;
    }
}