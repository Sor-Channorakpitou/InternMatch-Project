// src/components/InternShipCard.jsx
import { useState } from "react";
import { MapPin, Clock, DollarSign, Users, Bookmark, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function InternShipCard({ internship, onApply, view = "grid" }) {
  const { user, savedJobs, toggleSave, applications } = useAuth();

  const isSaved = savedJobs?.has(internship.id);
  const isApplied = applications?.find((a) => a.internshipId === internship.id);
  const [hovered, setHovered] = useState(false);

  // Logo badge
  const LogoBadge = () => (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0"
      style={{
        backgroundColor: internship.logoColor + "20",
        border: `1.5px solid ${internship.logoColor}40`,
        color: internship.logoColor,
      }}
    >
      {internship.logo}
    </div>
  );

  // Skill pills
  const SkillPills = ({ max }) => (
    <div className="flex flex-wrap gap-1.5">
      {(max ? internship.skills.slice(0, max) : internship.skills).map((s) => (
        <span key={s} className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5 font-medium">
          {s}
        </span>
      ))}
    </div>
  );

  // Type badge colors
  const typeBadgeClass = {
    Remote: "bg-green-50 text-green-700",
    Hybrid: "bg-teal-50 text-teal-700",
    "On-site": "bg-blue-50 text-blue-700",
  }[internship.type] || "bg-gray-100 text-gray-600";

  // Action button
  const ActionButton = () => {
    if (!user) return <span className="text-xs text-gray-400">Sign in to apply</span>;
    if (isApplied) return (
      <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
        <CheckCircle size={14} /> Applied
      </span>
    );
    return (
      <button
        onClick={() => onApply(internship)}
        className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all active:scale-95"
      >
        Apply Now
      </button>
    );
  };

  // ── LIST view ──────────────────────────────────────────────
  if (view === "list") {
    return (
      <div
        className={`bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 flex-wrap transition-shadow ${hovered ? "shadow-md" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <LogoBadge />
        <div className="flex-1 min-w-[160px]">
          <div className="font-semibold text-gray-900 text-sm">{internship.title}</div>
          <div className="text-xs text-gray-500">{internship.company} · {internship.location}</div>
        </div>
        <SkillPills max={2} />
        <span className="text-sm font-semibold text-green-600">{internship.stipend}</span>
        {user && (
          <button
            onClick={() => toggleSave(internship.id)}
            className={`p-1.5 rounded-lg transition-colors ${isSaved ? "text-blue-600 bg-blue-50" : "text-gray-300 hover:text-blue-400"}`}
          >
            <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
        )}
        <ActionButton />
      </div>
    );
  }

  // ── GRID view ─────────────────────────────────────────────
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 transition-all overflow-hidden relative ${
        hovered ? "shadow-md -translate-y-0.5" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Featured gradient stripe */}
      {internship.featured && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-blue-600 to-purple-600" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mt-1">
        <div className="flex items-center gap-3">
          <LogoBadge />
          <div>
            <div className="font-semibold text-gray-900 text-sm leading-tight">{internship.title}</div>
            <div className="text-xs text-gray-500 mt-0.5">{internship.company}</div>
          </div>
        </div>
        {user && (
          <button
            onClick={() => toggleSave(internship.id)}
            className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${isSaved ? "text-blue-600 bg-blue-50" : "text-gray-300 hover:text-blue-400"}`}
          >
            <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
        <span className="flex items-center gap-1"><MapPin size={12} />{internship.location}</span>
        <span className="flex items-center gap-1"><Clock size={12} />{internship.duration}</span>
        <span className="flex items-center gap-1 text-green-600 font-semibold"><DollarSign size={12} />{internship.stipend}</span>
        <span className={`px-2 py-0.5 rounded-full font-semibold ${typeBadgeClass}`}>{internship.type}</span>
        {internship.featured && (
          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold">⚡ Featured</span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{internship.description}</p>

      {/* Skills */}
      <SkillPills />

      <hr className="border-gray-100" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Users size={12} /> {internship.applicants} applicants · {internship.posted}
        </span>
        <ActionButton />
      </div>
    </div>
  );
}