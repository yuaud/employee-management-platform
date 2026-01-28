import type { Location } from "../../interfaces/Location/LocationInterface";
import { ISO8601formatDateTime } from "../../utility/ISO8601FormatDate";


interface LocationDetailPopupProps {
  location: Location;
  onClose: () => void;
}

const LocationDetailPopup = ({ location, onClose }: LocationDetailPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-surface border border-text w-full max-w-lg rounded shadow-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text">
            Location Details
          </h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-accent"
          >
            ✕
          </button>
        </div>

        {/* Address Info */}
        <div className="space-y-2 text-sm text-text">
          {location.streetAddress && (
            <div>
              <span className="font-semibold">Street:</span>{" "}
              {location.streetAddress}
            </div>
          )}

          {location.city && (
            <div>
              <span className="font-semibold">City:</span> {location.city}
            </div>
          )}

          {location.postalCode && (
            <div>
              <span className="font-semibold">Postal Code:</span>{" "}
              {location.postalCode}
            </div>
          )}
          <div className="flex text-xs text-gray-500 gap-4 mt-4">
            <span className="gap-2">
             Created At: {ISO8601formatDateTime(location.createdAt)}
            </span>
            <span className="gap-2">
             Last Updated At: {ISO8601formatDateTime(location.updatedAt)}
            </span>
          </div>
        </div>

        {/* Country & Region */}
        <div className="mt-4 border-t pt-4 text-sm text-text">
          <div>
            <span className="font-semibold">Country:</span>{" "}
            {location.country.countryName} (
            {location.country.countryId})
          </div>
          <div className="text-gray-500 text-xs">
            Region: {location.country.region.regionName}
          </div>
        </div>

        {/* Departments */}
        {location.departments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-text mb-2">
              Departments
            </h3>

            <div className="border border-text rounded divide-y max-h-48 overflow-y-auto">
              {location.departments.map((dept) => (
                <div
                  key={dept.departmentId}
                  className="p-2 text-sm text-text bg-card"
                >
                  {dept.departmentName}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetailPopup;
