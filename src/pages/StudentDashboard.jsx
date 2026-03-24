// src/pages/StudentDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Eye, CheckCircle, Bookmark } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MOCK_INTERNSHIPS } from "../data/mockData";
import StatCard from "../components/StatCard";

export default function StudentDashboard() {
  const { user, applications, savedJobs, resumeFile } = useAuth();
  const navigate = useNavigate();

  // TODO [YOU]: useState for activeTab — default "overview"
  //   Tabs: "overview" | "applications" | "saved"

  // TODO [YOU]: useEffect — if !user, navigate to /login

  // TODO [YOU]: useEffect — set a mounted flag to true after first render
  //   (used to trigger CSS width transition on the profile strength bar)

  // ── Derived values ─────────────────────────────────────────

  // TODO [YOU]: counts object — count applications by status
  //   { submitted: 0, under_review: 0, accepted: 0 }
  //   hint: use applications.forEach(...)

  // TODO [YOU]: savedListings — filter MOCK_INTERNSHIPS where savedJobs.has(item.id)

  // TODO [YOU]: profileItems array — each has { label, done (bool) }
  //   Example entries: "Resume uploaded" (done = !!resumeFile), "Skills listed" (done = true), etc.
  //   At least 5 items

  // TODO [YOU]: profilePct — Math.round(doneCount / total * 100)

  if (!user) return null; // useEffect handles redirect

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* ── Profile header card ── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 mb-7 flex gap-5 flex-wrap items-center">

        {/* Avatar */}
        {/* TODO [YOU]: 72x72 circle, blue-purple gradient, white initials text */}

        {/* Info */}
        <div className="flex-1">
          {/* TODO [YOU]: user.name as h1 */}
          {/* TODO [YOU]: "{user.major} · {user.university} · {user.year} · GPA {user.gpa}" */}
          {/* TODO [YOU]: Row of skill pills from user.skills array */}
        </div>

        {/* Profile strength */}
        <div className="min-w-[170px]">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Profile strength</span>
            {/* TODO [YOU]: show profilePct% in blue */}
          </div>
          {/* TODO [YOU]: Progress bar
              — gray track (h-2 rounded-full bg-gray-100)
              — blue-purple gradient fill div inside
              — width: mounted ? `${profilePct}%` : "0%"
              — Tailwind transition-all duration-1000 */}

          {/* TODO [YOU]: Resume upload mini button
              — if resumeFile → green "✓ {filename}" pill
              — else → blue "Upload Resume" button with Upload icon
              — use a hidden <input type="file" accept=".pdf"> + ref */}
        </div>
      </div>

      {/* ── Tabs ── */}
      {/* TODO [YOU]: Tab buttons row — "Overview", "Applications", "Saved Jobs"
          — active tab: blue bg + white text
          — inactive: gray text
          — "Applications" shows count badge
          — "Saved Jobs" shows savedJobs.size badge */}

      {/* ══════════════════════════════════════════
          OVERVIEW TAB
          ══════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div>
          {/* Stat cards row */}
          {/* TODO [YOU]: Grid of 4 StatCards
              1. "Total Applications" → applications.length → color blue → icon Briefcase
              2. "Under Review"       → counts.under_review  → color amber → icon Eye
              3. "Offers Received"    → counts.accepted      → color green → icon CheckCircle
              4. "Saved Jobs"         → savedJobs.size       → color purple → icon Bookmark */}

          {/* Pipeline + weekly chart row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">

            {/* Pipeline card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold mb-4">Application Pipeline</h3>
              {/* TODO [YOU]: Progress bar split into 3 colored segments
                  — submitted: blue, under_review: amber, accepted: green
                  — width of each = (count / total) * 100%
                  — total = applications.length || 1
                  — h-3 rounded-full overflow-hidden flex */}
              {/* TODO [YOU]: Legend below bar — colored dot + label + count for each stage */}
            </div>

            {/* Weekly chart card */}
            {/* TODO [FRIEND]: Bar chart card
                — title "Applications This Week"
                — 7 bars for Mon–Sun
                — use hardcoded data [1,2,0,1,3,2,1] for now
                — bars: div with height proportional to value, blue bg, rounded top
                — last bar (today) is full blue, others are 40% opacity */}
          </div>

          {/* Recent applications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Recent Activity</h3>
              <button onClick={() => {/* TODO [YOU]: setActiveTab("applications") */}}
                className="text-sm text-blue-600 font-medium">
                View all →
              </button>
            </div>
            {/* TODO [YOU]: Map first 3 applications → ApplicationRow (build inline or extract) */}
            {/* ApplicationRow needs: role, company, appliedDate, status, nextStep */}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          APPLICATIONS TAB
          ══════════════════════════════════════════ */}
      {activeTab === "applications" && (
        <div className="flex flex-col gap-3">
          {/* TODO [YOU]: if applications is empty → show empty state with "Browse Internships" button */}
          {/* TODO [YOU]: else → map ALL applications → ApplicationRow */}
        </div>
      )}

      {/* ══════════════════════════════════════════
          SAVED JOBS TAB
          ══════════════════════════════════════════ */}
      {activeTab === "saved" && (
        <div>
          {/* TODO [FRIEND]: if savedListings is empty → show empty state */}
          {/* TODO [FRIEND]: else → grid of mini job cards from savedListings
              Each mini card shows: logo, title, company, skills, stipend, "Apply Now" button */}
        </div>
      )}
    </div>
  );
}

// ── ApplicationRow (inline helper) ────────────────────────────
// TODO [YOU]: Build this small component used in both overview + applications tab
// Props: app (application object)
// Renders:
//   — role name (bold) + company · applied date
//   — StatusBadge (map status to color: submitted=blue, under_review=amber, accepted=green)
//   — nextStep text with → arrow icon
//   — small "Resume attached" green line if app.resumeUploaded
function ApplicationRow({ app }) {
  // TODO [YOU]
}
