// src/pages/RecruiterDashboard.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { MOCK_INTERNSHIPS, RECRUITER_ANALYTICS } from "../data/mockData";
import StatCard from "../components/StatCard";
import { Briefcase, Users, Eye, Clock, Plus, Edit } from "lucide-react";

export default function RecruiterDashboard() {
  const { user } = useAuth();

  // TODO [FRIEND]: useState for activeTab — default "analytics"
  //   Tabs: "analytics" | "applicants" | "listings"

  // TODO [FRIEND]: useState for applicants list
  //   Seed with this array:
  // [
  //   { id:1, name:"Jordan Lee",   university:"MIT",            status:"under_review", applied:"Mar 10", skills:["React","TypeScript"], gpa:"3.9" },
  //   { id:2, name:"Priya Sharma", university:"Stanford",       status:"submitted",    applied:"Mar 11", skills:["React","CSS"],        gpa:"3.7" },
  //   { id:3, name:"Marcus Webb",  university:"Carnegie Mellon",status:"accepted",     applied:"Mar 8",  skills:["TypeScript","GraphQL"],gpa:"3.8" },
  //   { id:4, name:"Anika Patel",  university:"Georgia Tech",   status:"submitted",    applied:"Mar 12", skills:["React","Node.js"],    gpa:"3.6" },
  // ]

  // TODO [FRIEND]: useState for toast — default null

  // TODO [FRIEND]: const a = RECRUITER_ANALYTICS

  // TODO [FRIEND]: changeStatus(id, newStatus) function
  //   — update applicants array with matching id
  //   — show toast "Status updated"
  //   — clear toast after 2000ms

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          {/* TODO [FRIEND]: h1 "Recruiter Hub" */}
          {/* TODO [FRIEND]: "{user.company} · {user.role}" subtitle */}
        </div>
        {/* TODO [FRIEND]: "Post New Listing" blue button with Plus icon */}
      </div>

      {/* Tabs */}
      {/* TODO [FRIEND]: 3 tab buttons — "Analytics", "Applicants", "My Listings"
          Same style as StudentDashboard tabs */}

      {/* ══════════════════════════════════════════
          ANALYTICS TAB
          ══════════════════════════════════════════ */}
      {/* TODO [FRIEND]: Render when activeTab === "analytics" */}
      <div>

        {/* Stat cards */}
        {/* TODO [FRIEND]: Grid of 4 StatCards
            1. "Active Listings"    → a.totalListings    → blue   → Briefcase
            2. "Total Applicants"   → a.totalApplicants  → purple → Users
            3. "Review Rate"        → `${a.reviewRate}%` → teal   → Eye
            4. "Avg Days to Hire"   → a.avgTimeToHire    → amber  → Clock */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

          {/* Hiring funnel */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold mb-5">Hiring Funnel</h3>
            {/* TODO [FRIEND]: Build FunnelChart
                Stages from a.byStage: submitted, screening, interview, offer, hired
                For each stage: label on left, colored fill bar proportional to value, % on right
                Colors: blue, purple, amber, teal, green — one per stage in order */}
          </div>

          {/* Top skills */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold mb-5">Top Applicant Skills</h3>
            {/* TODO [FRIEND]: SkillsBar
                Map a.topSkills → for each skill:
                  skill name + count label on one row
                  bar below: width = (count / max) * 100%, height h-2
                  first bar blue-600, rest lighter blue shades */}
          </div>
        </div>

        {/* Weekly trend */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mt-4">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
            <h3 className="font-semibold">Weekly Application Trend</h3>
            {/* TODO [FRIEND]: "+18% vs last week" green badge */}
          </div>
          {/* TODO [FRIEND]: Bar chart using a.weeklyApplicants (7 values)
              — same structure as student dashboard weekly chart
              — label under each bar: Mon Tue Wed Thu Fri Sat Sun
              — value label above each bar */}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          APPLICANTS TAB
          ══════════════════════════════════════════ */}
      {/* TODO [FRIEND]: Render when activeTab === "applicants" */}
      <div>
        {/* TODO [FRIEND]: Header row — "Showing X applicants for Frontend Engineering Intern"
            + count badges by status */}

        {/* TODO [FRIEND]: Map applicants → ApplicantCard
            ApplicantCard shows:
              — colored avatar circle (initials)
              — name, university, GPA, applied date
              — skill pills
              — StatusBadge
              — <select> to change status → calls changeStatus(a.id, newValue)
                options: submitted, under_review, interview, accepted, rejected */}
      </div>

      {/* ══════════════════════════════════════════
          LISTINGS TAB
          ══════════════════════════════════════════ */}
      {/* TODO [FRIEND]: Render when activeTab === "listings" */}
      <div>
        {/* TODO [FRIEND]: Map first 3 MOCK_INTERNSHIPS → listing row
            Each row: logo, title, location · duration · stipend,
            applicant count, "Active" green badge, Edit button */}
      </div>

      {/* TODO [FRIEND]: Toast notification */}
    </div>
  );
}
