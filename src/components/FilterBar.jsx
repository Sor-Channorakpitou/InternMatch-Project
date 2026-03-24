// src/components/FilterBar.jsx
import { Search, SlidersHorizontal } from "lucide-react";
import { INDUSTRIES, LOCATIONS, JOB_TYPES } from "../data/mockData";

// Props this component receives from HomePage:
//   search, setSearch
//   industry, setIndustry
//   location, setLocation
//   type, setType
//   onClear (function)
//   count (number of filtered results)

export default function FilterBar({
  search, setSearch,
  industry, setIndustry,
  location, setLocation,
  type, setType,
  onClear, count,
}) {
  // TODO [YOU]: derive a boolean hasFilters
  //   true if search is not empty OR industry !== "All Industries"
  //   OR location !== "All Locations" OR type !== "All Types"

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">

      {/* Search input */}
      <div className="relative flex-1 min-w-[200px]">
        {/* TODO [YOU]: Position Search icon inside input on the left side */}
        {/* TODO [YOU]: Input field
            — value={search}, onChange updates setSearch
            — placeholder "Search roles, companies, skills…"
            — Tailwind: w-full, pl-9, border, rounded-xl, focus ring */}
      </div>

      {/* Industry dropdown */}
      {/* TODO [YOU]: <select> bound to industry / setIndustry
          — map over INDUSTRIES array for <option> tags
          — Tailwind: border, rounded-xl, px-3, py-2, text-sm */}

      {/* Location dropdown */}
      {/* TODO [YOU]: <select> bound to location / setLocation
          — map over LOCATIONS array */}

      {/* Type dropdown */}
      {/* TODO [FRIEND]: <select> bound to type / setType
          — map over JOB_TYPES array */}

      {/* Results count + clear button */}
      <div className="flex items-center gap-3 ml-auto">
        {/* TODO [FRIEND]: Show "{count} result(s)" in muted text */}

        {/* TODO [FRIEND]: If hasFilters is true, show a "Clear ×" button
            — onClick calls onClear
            — style: small, blue text, blue background pill */}
      </div>
    </div>
  );
}
