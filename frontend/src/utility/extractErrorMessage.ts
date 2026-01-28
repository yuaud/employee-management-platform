export function extractErrorMessage(error: any, defaultMessage: string): string {
  const data = error?.response?.data;
  // Array (validation errors)
  if (Array.isArray(data)) {
    if (data.length === 0) return "Validation error";
    return data
      .map((e) => {
        const field = e?.field;
        const message = e?.message;
        if(field && message){
          return `${field}: ${message}`
        }
        if(message){
          return message;
        }
        return null;
      })
      .filter(Boolean)
      .join(", ");
  }

  // Object { message: "" }
  if (typeof data === "object" && data !== null) {
    if (typeof data.message === "string") {
      return data.message;
    }
  }

  // Plain string
  if (typeof data === "string") {
    return data;
  }

  // Axios fallback
  if (typeof error?.message === "string") {
    return error.message;
  }

  return defaultMessage;
}
