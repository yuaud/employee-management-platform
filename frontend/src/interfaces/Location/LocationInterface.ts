import type { Country, LightCountry } from "../CountryInterface";

export interface Location{
    locationId: number;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    country: Country;
    departments: LightDepartmentResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface LightLocation{
    locationId: number;
    country: LightCountry;
    city: string;
}

export interface LocationRequest{
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    countryId?: string;
}

export interface LightDepartmentResponse{
    departmentId: number;
    departmentName: string;
}

export interface LocationFilter{
    country?: string;
    city?: string;
    postalCode?: string;
    departmentId?: number;
    sort?: SortItem;
}

export type SortDirection = "ASC" | "DESC";
export type SortField = "HIRE_DATE" | "SALARY" | "UPDATED_AT";
type SortItem = {
  field: SortField,
  direction: string;
}