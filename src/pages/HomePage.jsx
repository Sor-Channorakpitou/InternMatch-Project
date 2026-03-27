// src/pages/HomePage.jsx
import { useState, useMemo } from "react";
import { MOCK_INTERNSHIPS } from "../data/mockData";
import InternShipCard from "../components/InternShipCard";
import FilterBar from "../components/FilterBar";
import ApplyModal from "../components/ApplyModal";
import { useAuth } from "../context/AuthContext";
import { Zap } from "lucide-react";

export default function HomePage() {
  const { applyToJob, user } = useAuth();

  // Filter state
  // TODO [YOU]: useState for search — default ""
  // TODO [YOU]: useState for industry — default "All Industries"
  // TODO [YOU]: useState for location — default "All Locations"
  // TODO [YOU]: useState for type — default "All Types"

  // UI state
  // TODO [YOU]: useState for sortBy — default "recent" ("recent"|"stipend"|"applicants")
  // TODO [YOU]: useState for viewMode — default "grid" ("grid"|"list")
  // TODO [YOU]: useState for applyTarget — default null (holds internship object)
  // TODO [YOU]: useState for toast — default null (holds message string)

  // ── useMemo filter + sort ──────────────────────────────────
  // TODO [YOU]: const filtered = useMemo(() => { ... }, [search, industry, location, type, sortBy])
  //
  // Inside useMemo:
  //   1. Filter MOCK_INTERNSHIPS:
  //      - matchSearch: title, company, skills[], industry all .toLowerCase().includes(q)
  //      - matchIndustry: industry === "All Industries" OR item.industry === industry
  //      - matchLocation: same pattern
  //      - matchType: same pattern
  //      - return matchSearch && matchIndustry && matchLocation && matchType
  //
  //   2. Sort the filtered result:
  //      - "stipend"    → sort by stipendNum descending
  //      - "applicants" → sort by applicants ascending (least competitive first)
  //      - "recent"     → sort by postedDate descending (newest first)
  //
  //   3. Return sorted array

  // ── Helpers ───────────────────────────────────────────────
  // TODO [YOU]: clearFilters() — resets all 4 filter states to defaults

  // TODO [YOU]: showToast(msg) — sets toast to msg, clears it after 3000ms with setTimeout

  // TODO [YOU]: handleApply(internship)
  //   — if no user, navigate to /login (use useNavigate from react-router-dom)
  //   — else setApplyTarget(internship)

  // TODO [YOU]: submitApplication(coverLetter)
  //   — call applyToJob(applyTarget, coverLetter)
  //   — call showToast with a success message
  //   — setApplyTarget(null)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ── Hero section ── */}
      <div className="text-center mb-12">
        {/* TODO [YOU]: "featured count" pill — blue bg, Zap icon, "X+ internships updated daily" */}

        {/* TODO [YOU]: H1 heading — two lines
            Line 1: "Find your perfect"
            Line 2: "internship match" — gradient text blue→purple
            Use text-5xl font-bold, font-serif or a display class */}

        {/* TODO [YOU]: Subtitle paragraph — muted, max-w-lg centered */}

        {/* TODO [YOU]: Quick stats row — 4 items side by side
            { label: "Companies", value: unique company count from MOCK_INTERNSHIPS }
            { label: "Remote roles", value: count where type === "Remote" }
            { label: "Avg stipend", value: "$41/hr" }
            { label: "Acceptance rate", value: "14%" }
            Each: bold number + small label below */}
      </div>

      {/* ── Filter bar ── */}
      {/* TODO [YOU]: Render FilterBar with all filter props + count={filtered.length} */}

      {/* ── Controls bar ── */}
      <div className="flex items-center justify-between my-5 flex-wrap gap-3">

        {/* Sort buttons */}
        <div className="flex items-center gap-2">
          {/* TODO [YOU]: Map over sort options and render toggle buttons
              Options: ["recent","Most Recent"], ["stipend","Highest Pay"], ["applicants","Least Competitive"]
              Active: blue bg + blue text. Inactive: gray */}
        </div>

        {/* View toggle */}
        {/* TODO [YOU]: Grid / List toggle buttons using Grid2X2 and List icons from lucide-react */}
      </div>

      {/* ── Featured banner ── */}
      {/* TODO [FRIEND]: Show only when no filters active
          — dark blue/purple gradient card
          — show first featured internship's title, company, stipend, deadline
          — "Quick Apply →" button (white outlined)
          — onClick → handleApply(featuredInternship) */}

      {/* ── Listings ── */}
      {/* TODO [YOU]: If filtered.length === 0, show empty state
          — Search icon, "No internships match your filters." text
          — "Clear all filters" link button */}

      {/* TODO [YOU]: If viewMode === "grid":
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            map filtered → <InternShipCard view="grid" onApply={handleApply} />
          </div>
      */}

      {/* TODO [YOU]: If viewMode === "list":
          <div className="flex flex-col gap-3">
            map filtered → <InternShipCard view="list" onApply={handleApply} />
          </div>
      */}

      {/* Apply modal */}
      {/* TODO [YOU]: if applyTarget is not null, render:
          <ApplyModal
            internship={applyTarget}
            onClose={() => setApplyTarget(null)}
            onSubmit={submitApplication}
          />
      */}

      {/* Toast notification */}
      {/* TODO [FRIEND]: if toast is not null, render fixed bottom-center pill
          — dark background, white text, rounded-full
          — animate in with Tailwind transition classes */}
    </div>
  );
}
