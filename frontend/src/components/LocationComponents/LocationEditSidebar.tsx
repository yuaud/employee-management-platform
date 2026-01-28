import { useState } from "react";
import type { Location, LocationRequest } from "../../interfaces/Location/LocationInterface";
import type { Country } from "../../interfaces/CountryInterface";

type LocationEditSidebarProps = {
    mode: "add" | "edit";
    location?: Location | null;
    countries: Country[];
    onClose: () => void;
    onSubmit: (location: LocationRequest) => void;
}

type FormErrors = {
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  countryId?: string;
};

const LocationEditSidebar = ({
  mode,
  location,
  countries,
  onClose,
  onSubmit,
}: LocationEditSidebarProps) => {
  const [streetAddress, setStreetAddress] = useState<string>(location?.streetAddress ?? "");
  const [postalCode, setPostalCode] = useState<string>(location?.postalCode ?? "");
  const [city, setCity] = useState<string>(location?.city ?? "");
  const [countryId, setCountryId] = useState<string>(location?.country.countryId ?? "");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {}; 
    if(mode === "add"){
      if(!countryId){
        newErrors.countryId = "Country cannot be empty";
      }
      if(!city.trim()){
        newErrors.city = "City cannot be empty";
      } else if(city.length > 100){
        newErrors.city = "City must be less than 100 characters";
      }
      if(postalCode.length > 20){
        newErrors.postalCode = "Postal Code must be less than 20 characters";
      }
      if(streetAddress.length > 255){
        newErrors.streetAddress = "Street Address must be less than 255 characters";
      }
    }
    if(mode === "edit"){
      // countryId edit'te opsiyonel, ama verilmişse boş olamaz
      if (countryId === "") {
        newErrors.countryId = "Country cannot be empty";
      }
      if (city && city.length > 100) {
        newErrors.city = "City must be less than 100 characters";
      }
      if (postalCode && postalCode.length > 20) {
        newErrors.postalCode = "Postal Code must be less than 20 characters";
      }
      if (streetAddress && streetAddress.length > 255) {
        newErrors.streetAddress = "Street Address must be less than 255 characters";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }


  const handleSubmit = () => {
    if(!validate()) return;
    onSubmit({streetAddress, postalCode, city, countryId} as LocationRequest);
    onClose();
  };
  return (
    <>
      {mode === "edit" && (
        <aside className="fixed top-0 right-0 h-screen w-96 bg-surface border-l shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-text font-semibold">
              Edit Location: #{location?.locationId}
            </h2>
            <button className="text-text" onClick={onClose}>
              ✕
            </button>
          </div>


          <div className="space-y-2">
            <p className="text-text mt-4">Country: </p>
            <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="w-full border border-gray-200 p-2 shadow-sm rounded bg-card text-text"
            >
              <option value="" disabled>Select Country</option>
              {countries.map((country) => (
                <option
                key={country.countryId}
                value={country.countryId}
                >
                  {country.countryName}
                </option>
              ))}
            </select>
            {errors.countryId && (<p className="text-sm text-red-600">{errors.countryId}</p>)}


            <p className="mt-4 text-text">City: </p>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
            />
            {errors.city && (<p className="text-sm text-red-600">{errors.city}</p>)}


            <p className="mt-4 text-text">Postal Code: </p>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
            />
            {errors.postalCode && (<p className="text-sm text-red-600">{errors.postalCode}</p>)}

            <p className="mt-4 text-text">Street Address: </p>
            <textarea
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              rows={4}
              className="w-full resize-none border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
            />
            {errors.streetAddress && (<p className="text-sm text-red-600">{errors.streetAddress}</p>)}


            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-2 rounded mt-4"
            >
              Save
            </button>
          </div>
        </aside>
      )}
      {mode === "add" && (
        <aside className="fixed top-0 right-0 h-screen w-96 bg-surface border-l shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-text font-semibold">Create New Location</h2>
            <button className="text-text" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="space-y-2">


            <p className="text-text"><span className="text-red-600 font-semibold">*</span>Country: </p>
            <select
            value={countryId}
            onChange={(e) => {
              setCountryId(e.target.value);
              setErrors(prev => ({...prev, countryId: !e.target.value ? prev.countryId : undefined}))
            }}
            className="w-full border border-gray-200 p-2 shadow-sm rounded bg-card text-text"
            >
              <option value="" disabled>Select Country</option>
              {countries.map((country) => (
                <option
                key={country.countryId}
                value={country.countryId}
                >
                  {country.countryName}
                </option>
              ))}
            </select>
            {errors.countryId && (<p className="text-sm text-red-600">{errors.countryId}</p>)}

            <p className="mt-4 text-text"><span className="text-red-600 font-semibold">*</span>City: </p>
            <input
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setErrors(prev => ({...prev, city: (!e.target.value.trim() || e.target.value.length > 100) ? prev.city : undefined}))
              }}
              className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
            />
            {errors.city && (<p className="text-sm text-red-600">{errors.city}</p>)}


            <p className="mt-4 text-text">Postal Code: </p>
            <input
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
                setErrors(prev => ({...prev, postalCode: e.target.value.length > 20 ? prev.postalCode : undefined}))
              }}
              className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
            />
            {errors.postalCode && (<p className="text-sm text-red-600">{errors.postalCode}</p>)}


            <p className="mt-4 text-text">Street Address: </p>
            <textarea
            value={streetAddress}
            onChange={(e) => {
              setStreetAddress(e.target.value);
              setErrors((prev) => ({
                ...prev,
                streetAddress:
                  e.target.value.length > 255
                    ? prev.streetAddress
                    : undefined,
              }));
            }}
            rows={4}
            className="w-full resize-none border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
          />
            {errors.streetAddress && (<p className="text-sm text-red-600">{errors.streetAddress}</p>)}


            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-2 rounded mt-4"
            >
              Create
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default LocationEditSidebar;
