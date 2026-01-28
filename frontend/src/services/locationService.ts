import axios from "axios";
import type {
  Location,
  LocationFilter,
  LocationRequest,
} from "../interfaces/Location/LocationInterface";
import { extractErrorMessage } from "../utility/extractErrorMessage";
import type { Page } from "../interfaces/PageInterface";
import api from "./axiosInterceptor";

const API_URL = "/locations";

export const getLocations = async (): Promise<Location[]> => {
  try {
    const response = await api.get(API_URL);
    return response.data as Location[];
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(
              err,
              "Exception while fetching Locations",
            ),
            status: err.response?.status,
            type: "error",
          },
        }),
      );
    }
    throw err;
  }
};

export const filterLocations = async (filters: LocationFilter, page: number, size: number): Promise<Page<Location>> => {
  try {
    const body = Object.fromEntries(
      Object.entries(filters).filter(
        ([v]) => v !== undefined && v !== null && v !== "",
      ),
    );
    const response = await api.post(`${API_URL}/filter?page=${page}&size=${size}`, body);
    return response.data as Page<Location>;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(
              err,
              "Exception while fetching Locations",
            ),
            status: err.response?.status,
            type: "error",
          },
        }),
      );
    }
    throw err;
  }
};

export const getLocationById = async (
  locationId: number,
): Promise<Location> => {
  try {
    const response = await api.get(`${API_URL}/${locationId}`);
    return response.data as Location;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(
              err,
              `Exception while fetching Location with id: #${locationId}`,
            ),
            status: err.response?.status,
            type: "error",
          },
        }),
      );
    }
    throw err;
  }
};

export const createLocation = async (
  location: LocationRequest,
): Promise<Location> => {
  try {
    const response = await api.post(`${API_URL}`, {
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      city: location.city,
      countryId: location.countryId,
    });
    window.dispatchEvent(
      new CustomEvent("api-error", {
        detail: {
          message: "Location successfully created",
          status: 201,
          type: "success",
        },
      }),
    );
    return response.data as Location;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(
              err,
              "Exception while creating new location",
            ),
            status: err.response?.status,
            type: "error",
          },
        }),
      );
    }
    throw err;
  }
};

export const updateLocation = async (
  locationId: number,
  location: LocationRequest,
): Promise<Location> => {
  try {
    const response = await api.put(`${API_URL}/${locationId}`, {
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      city: location.city,
      countryId: location.countryId,
    });
    window.dispatchEvent(
      new CustomEvent("api-error", {
        detail: {
          message: `Location #${locationId} successfully updated`,
          status: 200,
          type: "success",
        },
      }),
    );
    return response.data as Location;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(
              err,
              `Exception while updating Location with id: #${locationId}`,
            ),
            status: err.response?.status,
            type: "error",
          },
        }),
      );
    }
    throw err;
  }
};

export const deleteLocation = async (locationId: number) => {
  try {
    await api.delete(`${API_URL}/${locationId}`);
    window.dispatchEvent(
      new CustomEvent("api-error", {
        detail: {
          message: `#${locationId} successfully deleted`,
          status: 200,
          type: "success",
        },
      }),
    );
    return;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            message: extractErrorMessage(
              err,
              `Exception while deleting Location with id: #${locationId}`,
            ),
            status: err.response?.status,
            type: "error",
          },
        }),
      );
    }
    throw err;
  }
};
