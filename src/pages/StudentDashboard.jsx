// src/pages/StudentDashboard.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Eye, CheckCircle, Bookmark, Upload} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MOCK_INTERNSHIPS } from "../data/mockData";
import StatCard from "../components/StatCard";

export default function StudentDashboard() {
  const { user, applications, savedJobs, resumeFile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =  useState("overview");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);


  const counts = {submitted: 0, under_review:0, accepted: 0};
  applications.forEach((app) => {
    if(counts[app.status] !== undefined) counts[app.status]++;
  });

  const savedListings = MOCK_INTERNSHIPS.filter((item) => savedJobs.has(item.id));


  const profileItems = [
    { label: "Resume uploaded", done: !!resumeFile },
    { label: "Skills listed", done: true },
    { label: "University filled", done: !!user?.university },
    { label: "GPA provided", done: !!user?.gpa },
    { label: "Email verified", done: !!user?.email },
  ];

  const profilePct = Math.round(
    (profileItems.filter((item) => item.done).length / profileItems.length)*100
  )

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && user) {
      console.log("File uploaded:", file.name);
    }
  };


  if (!user) return null; 

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 mb-7 flex gap-5 flex-wrap items-center">
      
        <div className="w-18 h-18 rounded-full flex items-center justify-center text-white font-semibold text-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6)" }}>
          {user.avatar}
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
          <div className="flex flex-col gap-1 mt-1">
            <div className="text-sm text-gray-500"> {user.university} </div>
            <div className="text-sm text-gray-500"> {user.major} </div>
            <div className="text-sm text-gray-500"> {user.year} · GPA {user.gpa} </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {user.skills.map((skill) => (
              <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="min-w-[170px]">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Profile strength</span>
            <span className="text-blue-600 font-medium">{profilePct}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: mounted ? `${profilePct}%` : "0%",
                background: "linear-gradient(90deg, #6366f1, #3b82f6)",
              }}
            />
          </div>

          <div className="mt-3">
            {resumeFile ? (
              <span className="text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle size={12} />
                {resumeFile.name.length > 16
                  ? resumeFile.name.slice(0, 14) + "…"
                  : resumeFile.name}
              </span>
            ) : (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-blue-50">
                  <Upload size={12} /> Upload Resume
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
        {[
          { key: "overview", label: "Overview" },
          { key: "applications", label: "Applications", badge: applications.length },
          { key: "saved", label: "Saved Jobs", badge: savedJobs.size },
        ].map(({ key, label, badge }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`text-sm px-4 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
              activeTab === key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {label}
            {badge > 0 && (
              <span className={`text-xs px-1.5 rounded-full ${
                activeTab === key ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"
              }`}>
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Total Applications" value={applications.length} color="blue" icon={Briefcase} />
            <StatCard label="Under Review" value={counts.under_review} color="amber" icon={Eye} />
            <StatCard label="Offers Received" value={counts.accepted} color="green" icon={CheckCircle} />
            <StatCard label="Saved Jobs" value={savedJobs.size} color="purple" icon={Bookmark} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">

            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold mb-4">Application Pipeline</h3>
              <div className="h-3 rounded-full bg-gray-100 overflow-hidden flex">
                {[
                  { key: "submitted", color: "bg-blue-400" },
                  { key: "under_review", color: "bg-amber-400" },
                  { key: "accepted", color: "bg-green-400" },
                ].map(({ key, color }) => {
                  const total = applications.length || 1;
                  const width = (counts[key] / total) * 100;
                  return width > 0 ? (
                    <div key={key} className={`h-full ${color}`} style={{ width: `${width}%` }} />
                  ) : null;
                })}
              </div>
              <div className="flex gap-4 mt-3 flex-wrap">
                {[
                  { key: "submitted", label: "Submitted", dot: "bg-blue-400" },
                  { key: "under_review", label: "Under Review", dot: "bg-amber-400" },
                  { key: "accepted", label: "Accepted", dot: "bg-green-400" },
                ].map(({ key, label, dot }) => (
                  <div key={key} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`w-2 h-2 rounded-full ${dot}`} />
                    {label} <span className="text-gray-700 font-medium">{counts[key]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold mb-4">Applications This Week</h3>
              <div className="flex items-end gap-2 h-16">
                {[1, 2, 0, 1, 3, 2, 1].map((val, i) => {
                  const isToday = i === 6;
                  const maxVal = 3;
                  const heightPct = (val / maxVal) * 100;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className={`w-full rounded-sm ${isToday ? "bg-blue-500" : "bg-blue-200"}`}
                        style={{ height: `${heightPct}%`, minHeight: val > 0 ? 4 : 0 }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-2">
                {["M","T","W","T","F","S","S"].map((d, i) => (
                  <div key={i} className={`flex-1 text-center text-xs ${i === 6 ? "text-blue-500 font-medium" : "text-gray-400"}`}>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Recent Activity</h3>
              <button onClick={() => setActiveTab("applications")}
                className="text-sm text-blue-600 font-medium">
                View all →
              </button>
            </div>
            {applications.slice(0, 3).map((app) => (
              <ApplicationRow key={app.id} app={app} />
            ))}
            {applications.length === 0 && (
              <p className="text-sm text-gray-400 py-4 text-center">No applications yet.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "applications" && (
        <div className="flex flex-col gap-3">
          {applications.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center py-10">
              <p className="text-gray-400 mb-3">You haven't applied to anything yet.</p>
              <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Browse Internships
              </button>
            </div>
          ) : (
            applications.map((app) => <ApplicationRow key={app.id} app={app} />)
          )}
        </div>
      )}

      {activeTab === "saved" && (
        <div>
          {savedListings.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center py-10">
              <p className="text-gray-400 mb-3">No saved jobs yet.</p>
              <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Browse Internships
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedListings.map((job) => (
                <div key={job.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: job.logoColor }}>
                      {job.logo}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">{job.title}</p>
                      <p className="text-xs text-gray-400">{job.company} · {job.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((skill) => (
                      <span key={skill} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{skill}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-gray-700">{job.stipend}</span>
                    <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ApplicationRow({ app }) {
  const STATUS_CONFIG = {
    submitted: { label: "Submitted", color: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200", icon: "📤" },
    under_review: { label: "Under Review", color: "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border border-amber-200", icon: "👁️" },
    accepted: { label: "Accepted", color: "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200", icon: "✅" },
  };

  const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.submitted;

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-5 mb-4 last:mb-0 hover:border-blue-200 hover:shadow-lg transition-all duration-200">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0 shadow-sm">
              {app.company.charAt(0)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-base mb-1 truncate">{app.role}</h4>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span>{app.company}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">{app.appliedDate}</span>
              </p>
            </div>
          </div>
          
          {app.nextStep && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 rounded-lg px-3 py-2 inline-block">
              <span className="text-blue-500">→</span>
              <span className="font-medium">{app.nextStep}</span>
            </div>
          )}
          
          {app.resumeUploaded && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-green-600 font-medium">
              <CheckCircle size={12} className="text-green-500" />
              Resume attached
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm ${cfg.color}`}>
            <span className="text-sm">{cfg.icon}</span>
            {cfg.label}
          </span>
        </div>
      </div>
    </div>
  );
}