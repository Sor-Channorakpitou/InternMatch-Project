// src/components/InternShipCard.jsx
import { useState } from "react";
import { MapPin, Clock, DollarSign, Users, Bookmark } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Props: internship (object), onApply (function), view ("grid" | "list")
export default function InternShipCard({ internship, onApply, view = "grid" }) {
  const { user, savedJobs, toggleSave, applications } = useAuth();

  // TODO [YOU]: derive isSaved — check if internship.id is in savedJobs Set
  // TODO [YOU]: derive isApplied — find in applications where internshipId matches

  // TODO [YOU]: useState for hovered (for hover shadow effect)

  // ── Shared sub-pieces ──────────────────────────────────────

  // TODO [YOU]: Build a <LogoBadge /> block (not a separate component, just JSX)
  //   — 44x44 div, rounded-xl
  //   — background: internship.logoColor + "20" (20% opacity hex trick)
  //   — border: 1.5px solid internship.logoColor + "40"
  //   — shows internship.logo letter, color: internship.logoColor

  // TODO [YOU]: Build skill pills row
  //   — map over internship.skills
  //   — each: small gray rounded-full pill with Tailwind

  // TODO [YOU]: Build action button block
  //   — if no user: show muted "Sign in to apply" text
  //   — if applied: show green "✓ Applied" text with CheckCircle icon
  //   — if not applied: show blue "Apply Now" button, onClick → onApply(internship)

  // ── LIST view ─────────────────────────────────────────────
  if (view === "list") {
    return (
      <div className={`bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 flex-wrap transition-shadow ${
        // TODO [YOU]: add shadow-md on hover using hovered state
        ""
      }`}
        onMouseEnter={() => {/* TODO [YOU]: setHovered(true) */}}
        onMouseLeave={() => {/* TODO [YOU]: setHovered(false) */}}
      >
        {/* TODO [YOU]: LogoBadge */}
        {/* TODO [YOU]: Title + company info (flex-1) */}
        {/* TODO [YOU]: First 2 skills only */}
        {/* TODO [YOU]: Stipend in green */}
        {/* TODO [YOU]: Save bookmark button (only if logged in) */}
        {/* TODO [YOU]: Action button block */}
      </div>
    );
  }

  // ── GRID view (default) ────────────────────────────────────
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 transition-all ${
        // TODO [YOU]: shadow-md + -translate-y-0.5 on hover
        ""
      }`}
      onMouseEnter={() => {/* TODO [YOU] */}}
      onMouseLeave={() => {/* TODO [YOU] */}}
    >
      {/* TODO [YOU]: If internship.featured, render a 3px gradient top stripe
          Use a div with h-1 bg-gradient-to-r from-blue-600 to-purple-600
          positioned at top (use negative margin or absolute) */}

      {/* Header row: LogoBadge + title/company + bookmark */}
      {/* TODO [YOU] */}

      {/* Meta row: location, duration, stipend, type badge */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
        {/* TODO [YOU]: MapPin + internship.location */}
        {/* TODO [YOU]: Clock + internship.duration */}
        {/* TODO [YOU]: DollarSign + internship.stipend in green */}
        {/* TODO [FRIEND]: internship.type badge — color based on type
            Remote=green, Hybrid=teal, On-site=blue */}
        {/* TODO [FRIEND]: if internship.featured, show "⚡ Featured" amber badge */}
      </div>

      {/* Description */}
      {/* TODO [YOU]: <p> with internship.description, text-sm text-gray-500 */}

      {/* Skills row */}
      {/* TODO [YOU]: skill pills */}

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Footer: applicant count + action */}
      <div className="flex items-center justify-between">
        {/* TODO [FRIEND]: Users icon + "{internship.applicants} applicants · {internship.posted}" */}
        {/* TODO [YOU]: action button block */}
      </div>
    </div>
  );
}
