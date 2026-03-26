// src/components/FilterBar.jsx
import { Search, SlidersHorizontal } from "lucide-react";
import { INDUSTRIES, LOCATIONS, JOB_TYPES } from "../data/mockData";

export default function FilterBar({
  search, setSearch,
  industry, setIndustry,
  location, setLocation,
  type, setType,
  onClear, count,
}) {
  const hasFilters =
    search !== "" ||
    industry !== "All Industries" ||
    location !== "All Locations" ||
    type !== "All Types";

  const selectClass =
    "border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:border-blue-300 transition-colors";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">

      {/* Search input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search roles, companies, skills…"
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-colors"
        />
      </div>

      {/* Industry dropdown */}
      <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={selectClass}>
        {INDUSTRIES.map((i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </select>

      {/* Location dropdown */}
      <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass}>
        {LOCATIONS.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

      {/* Type dropdown */}
      <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
        {JOB_TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {/* Results count + clear */}
      <div className="flex items-center gap-3 ml-auto">
        <span className="text-sm text-gray-400 font-medium whitespace-nowrap">
          {count} result{count !== 1 ? "s" : ""}
        </span>
        {hasFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
          >
            <SlidersHorizontal size={12} />
            Clear ×
          </button>
        )}
      </div>
    </div>
  );
}