import { useState } from "react";
import type { LocationRequest } from "../../interfaces/Location/LocationInterface";
import type { Country } from "../../interfaces/CountryInterface";

type FormErrors = {
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  countryId?: string;
};

interface CreateLocationPopupProps {
  countries: Country[];
  onClose: () => void;
  onSubmit: (req: LocationRequest) => void;
}

const LocationCreatePopup = ({ countries, onClose, onSubmit }: CreateLocationPopupProps) => {
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [countryId, setCountryId] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

    
    const validate = (): boolean => {
      const newErrors: FormErrors = {}; 
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
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

  const handleSubmit = () => {
    if(!validate()) return;
    const req: LocationRequest = {
      streetAddress: streetAddress.trim(),
      postalCode: postalCode.trim(),
      city: city.trim(),
      countryId: countryId.trim(),
    };
    onSubmit(req);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-surface w-96 rounded shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-text">
            Create Location
          </h2>
          <button onClick={onClose} className="text-text">✕</button>
        </div>

        <div className="space-y-3">
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
              setCity(e.target.value)
              setErrors(prev => ({...prev, city: (!e.target.value.trim() || e.target.value.length > 100) ? prev.city : undefined}))
            }}
            className="w-full border border-gray-200 p-2 shadow-sm rounded text-text bg-card"
          />
          {errors.city && (<p className="text-sm text-red-600">{errors.city}</p>)}

          <p className="mt-4 text-text">Postal Code: </p>
          <input
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value)
              setErrors(prev => ({...prev, postalCode: e.target.value.length > 20 ? prev.postalCode : undefined}))
            }}
            placeholder="Postal Code"
            className="w-full border border-gray-200 shadow-sm p-2 rounded text-text bg-card"
            maxLength={20}
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
            className="w-full bg-green-600 text-white py-2 rounded mt-2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCreatePopup;
