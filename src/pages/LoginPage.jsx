// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // TODO [YOU]: useState for selected role — default null ("student" | "recruiter")
  // TODO [YOU]: useState for loading — default false

  // TODO [YOU]: handleLogin async function
  //   — if no selected role, return early
  //   — setLoading(true)
  //   — await 700ms fake delay
  //   — call login(selected)
  //   — navigate("/dashboard")
  //   — setLoading(false)

  const roles = [
    { id: "student",   emoji: "🎓", label: "Student",   sub: "Find & track internships" },
    { id: "recruiter", emoji: "💼", label: "Recruiter",  sub: "Post & manage listings" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

          {/* Logo icon */}
          {/* TODO [YOU]: 64x64 div, rounded-2xl, blue-purple gradient bg
              Briefcase icon inside, white, size 28 */}

          {/* Heading */}
          {/* TODO [YOU]: h1 "Welcome to InternMatch" — font-bold text-2xl */}
          {/* TODO [YOU]: subtitle paragraph — muted, text-sm, mb-8 */}

          {/* Role selector */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            I am a...
          </p>

          <div className="flex gap-3 mb-7">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => {/* TODO [YOU]: setSelected(r.id) */}}
                className={`flex-1 p-4 rounded-2xl border-2 transition-all text-center ${
                  // TODO [YOU]: if selected === r.id:
                  //   "border-blue-500 bg-blue-50" (active)
                  // else:
                  //   "border-gray-100 bg-gray-50 hover:border-gray-200" (inactive)
                  ""
                }`}
              >
                <div className="text-3xl mb-2">{r.emoji}</div>
                <div className={`font-semibold text-sm ${/* TODO [YOU]: blue text if selected */ ""}`}>
                  {r.label}
                </div>
                <div className="text-xs text-gray-400 mt-1">{r.sub}</div>
              </button>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={/* TODO [YOU]: handleLogin */undefined}
            disabled={/* TODO [YOU]: !selected || loading */false}
            className={`w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all ${
              // TODO [YOU]: if disabled → "bg-gray-200 text-gray-400 cursor-not-allowed"
              // else → "bg-blue-600 hover:bg-blue-700"
              ""
            }`}
          >
            {/* TODO [YOU]: if loading → spinner div + "Signing in…"
                else → Zap icon + "Continue as {selected role name or '…'}" */}
          </button>

          <p className="text-xs text-gray-300 mt-5">Demo mode — no real credentials required.</p>
        </div>

        {/* Bottom trust badges */}
        {/* TODO [FRIEND]: 3 small badges below the card
            — "10k+ students", "240+ listings", "Free forever"
            — each has a small Lucide icon + text, centered row */}
      </div>
    </div>
  );
}
