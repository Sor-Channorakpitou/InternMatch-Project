// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!selected) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(selected);
    navigate("/dashboard");
    setLoading(false);
  };

  const roles = [
    {
      id: "student",
      emoji: "🎓",
      label: "Student",
      sub: "Find & track internships",
      features: ["Browse 240+ listings", "Track applications", "Save favourites"],
    },
    {
      id: "recruiter",
      emoji: "💼",
      label: "Recruiter",
      sub: "Post & manage listings",
      features: ["Post internships", "Review applicants", "Analytics dashboard"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] bg-blue-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[360px] h-[360px] bg-violet-600 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo + heading */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/30 mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Welcome to <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">InternMatch</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Your launchpad for internships at the world's best companies.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 text-center">
            Sign in as
          </p>

          {/* Role selector */}
          <div className="flex flex-col gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group ${
                  selected === r.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-700 bg-slate-800/50 hover:border-slate-500"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Emoji icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all ${
                    selected === r.id ? "bg-blue-500/20" : "bg-slate-700"
                  }`}>
                    {r.emoji}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold text-sm transition-colors ${
                        selected === r.id ? "text-blue-400" : "text-white"
                      }`}>
                        {r.label}
                      </span>
                      {/* Checkmark */}
                      {selected === r.id && (
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5">{r.sub}</p>
                    {/* Feature list — show when selected */}
                    {selected === r.id && (
                      <ul className="mt-2 flex flex-col gap-1">
                        {r.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={handleLogin}
            disabled={!selected || loading}
            className={`w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
              !selected
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Continue as {selected ? roles.find((r) => r.id === selected)?.label : "…"}
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-600 mt-4">
            Demo mode — no real credentials required
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
          {[
            { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", label: "10k+ students" },
            { icon: "M2 7h20v14H2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", label: "240+ listings" },
            { icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3", label: "Free forever" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-1.5 text-xs text-slate-500">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d={b.icon} />
              </svg>
              {b.label}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease forwards; }
      `}</style>
    </div>
  );
}