import { CircleX, Info, SquarePen } from "lucide-react";
import type { Location } from "../../interfaces/Location/LocationInterface";

type LocationCardListProps = {
  locations: Location[];
  onInfo: (location: Location) => void;
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
}

type LocationCardProps = {
  location: Location;
  onInfo: (location: Location) => void;
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
}

// Single card
export const LocationCard = ({ location, onInfo, onEdit, onDelete }: LocationCardProps) => {
  return (
    <div className="h-full rounded-lg border border-gray-200 p-4 bg-card shadow-sm hover:shadow-md transition flex flex-col">
      <div className="text-sm text-text">#{location.locationId}</div>
      <div className="mt-1 flex items-baseline gap-1 text-text">
        <p>{location.country.countryId},</p>
        <p>{location.country.countryName}</p>
      </div>
      <div className="mt-1 flex items-baseline gap-1 text-text">
        <p>{location.city}</p>
      </div>
      <div className="mt-1 flex items-baseline gap-1 text-text">
        <p>{location.postalCode ?? "\u00A0"}</p>
      </div>
      <div className="mt-1 text-text">
        <p className="text-xs font-semibold">Street Address: </p>
        <p className="mt-2 text-sm">{location.streetAddress}</p>
      </div>
      <div className="mt-8 flex gap-1 text-text text-xs">
        <p className="font-semibold">Number of Departments on this location: </p>
        {location.departments.length}
      </div>
      {/* Actions */}
      <div className="mt-1 pt-3 border-t border-gray-300 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => onInfo(location)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Info size={14} />
            Info
          </button>

          <button
            onClick={() => onEdit(location)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            <SquarePen size={14} />
            Edit
          </button>
        </div>

        <button
          onClick={() => {
            const ok = window.confirm(`#${location.locationId} silinsin mi?`);
            if (!ok) return;
            onDelete(location);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700"
        >
          <CircleX size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

// List grid card view
export const LocationCardList = ({ locations, onInfo, onEdit, onDelete }: LocationCardListProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-stretch">
      {locations.map((location) => (
        <LocationCard key={location.locationId} location={location} onInfo={onInfo} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </div>
  );
};