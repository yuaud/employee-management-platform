import type { Region } from "./RegionInterface";

export interface Country {
    countryId: string;
    countryName: string;
    region: Region;
}

export interface LightCountry{
    countryId: string;
    countryName: string;
}