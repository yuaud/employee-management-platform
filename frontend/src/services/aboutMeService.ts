import axios from "axios";
import { extractErrorMessage } from "../utility/extractErrorMessage";

const PUBLIC_API = import.meta.env.VITE_PUBLIC_API;

type body = {
    subject: string;
    message: string;
}

export const sendMail = async (body: body) => {
    try{
        await axios.post(`${PUBLIC_API}/mailTo`, body)
        window.dispatchEvent(
            new CustomEvent("api-error", {
                detail: {
                    message: "Email successfully sent",
                    status: 200,
                    type: "success"
                }
            })
        )
        return;
    } catch(err: unknown){
        if(axios.isAxiosError(err)){
            window.dispatchEvent(
                new CustomEvent("api-error", {
                    detail: {
                        message: extractErrorMessage(err, "Exception while sending mail"),
                        status: err.response?.status,
                        type: "error"
                    },
                })
            );
        }
        throw err;
    }
}