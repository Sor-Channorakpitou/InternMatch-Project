// src/pages/RecruiterDashboard.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { MOCK_INTERNSHIPS, RECRUITER_ANALYTICS } from "../data/mockData";
import StatCard from "../components/StatCard";
import {Briefcase, Users, Eye, Clock, Plus, Edit} from "lucide-react";

export default function RecruiterDashboard() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("analytics");
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Jordan Lee", university: "MIT", status: "under_review", applied: "Mar 10", skills: ["React", "TypeScript"], gpa: "3.9" },
    { id: 2, name: "Priya Sharma", university: "Stanford", status: "submitted", applied: "Mar 11", skills: ["React", "CSS"], gpa: "3.7" },
    { id: 3, name: "Marcus Webb", university: "Carnegie Mellon", status: "accepted", applied: "Mar 8", skills: ["TypeScript", "GraphQL"], gpa: "3.8" },
    { id: 4, name: "Anika Patel", university: "Georgia Tech", status: "submitted", applied: "Mar 12", skills: ["React", "Node.js"], gpa: "3.6" },
  ]);

  const a = RECRUITER_ANALYTICS;
  const changeStatus = (id, newStatus) => {
    setApplicants(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":    return "bg-blue-100 text-blue-700";
      case "under_review": return "bg-amber-100 text-amber-700";
      case "interview":    return "bg-purple-100 text-purple-700";
      case "accepted":     return "bg-green-100 text-green-700";
      case "rejected":     return "bg-red-100 text-red-700";
      default:             return "bg-gray-100 text-gray-600";
    }
  };
  
  // Regex
  const getStatusLabel = (status) => {
    return status.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Header */}
      <header className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Hub</h1>
          <p className="text-gray-500 mt-1">
            {user.company} · {user.role}
          </p>
        </div>
        <button 
          onClick={() => alert("Post new internship feature coming soon!")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all active:scale-95"
        >
          <Plus size={20} />
          Post New Listing
        </button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {["analytics", "applicants", "listings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 font-medium text-sm transition-all border-b-2 -mb-px ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "analytics" && "Analytics"}
            {tab === "applicants" && "Applicants"}
            {tab === "listings" && "My Listings"}
          </button>
        ))}
      </div>

      {/* ==================== ANALYTICS TAB ==================== */}
      {activeTab === "analytics" && (
        <div className="space-y-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Active Listings" value={a.totalListings} color="blue" icon={Briefcase}/>
            <StatCard label="Total Applicants" value={a.totalApplicants} color="purple" icon={Users}/>
            <StatCard label="Review Rate" value={`${a.reviewRate}`} color="teal" icon={Eye} sub="Last 30 days"/>
            <StatCard label="Avg Days to Hire" value={a.avgTimeToHire} color="amber" icon={Clock}/>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Hiring Funnel */}
            <div className="bg-white rounded-3xl border border-gray-100 p-7">
              <h3 className="font-semibold text-lg mb-6">Hiring Funnel</h3>
              <div className="space-y-6">
                {Object.entries(a.byStage).map(([stage, count], index) => {
                  const max = Math.max(...Object.values(a.byStage));
                  const percentage = Math.round((count / max) * 100);
                  const colors = ["blue", "amber", "purple", "teal"];
                  
                  return (
                    <div key={stage} className="flex items-center gap-4">
                      <div className="w-28 text-sm font-medium capitalize text-gray-600">
                        {stage.replace("_", " ")}
                      </div>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-linear-to-r ${
                            colors[index % colors.length] === "blue" ? "from-blue-500 to-blue-600" :
                            colors[index % colors.length] === "amber" ? "from-amber-500 to-amber-600" :
                            colors[index % colors.length] === "purple" ? "from-purple-500 to-purple-600" : 
                            "from-teal-500 to-teal-600"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-right w-12 font-semibold text-gray-900">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Skills */}
            <div className="bg-white rounded-3xl border border-gray-100 p-7">
              <h3 className="font-semibold text-lg mb-6">Top Applicant Skills</h3>
              <div className="space-y-5">
                {a.topSkills.map((skill, i) => {
                  const width = 85 - i * 15;
                  return (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium">{skill}</span>
                        <span className="text-gray-500">{width} applicants</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${i === 0 ? "bg-blue-600" : "bg-blue-400"} rounded-full`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="bg-white rounded-3xl border border-gray-100 p-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Weekly Application Trend</h3>
              <span className="text-green-600 text-sm font-medium">+18% vs last week</span>
            </div>
<div className="flex items-end justify-between gap-2 h-52 w-full">
    {a.weeklyApplicants.map((value, i) => (
      <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
        
        <div className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
          {value}
        </div>
        
      
        <div 
          className="w-[50%] bg-blue-400 rounded-t-lg transition-all duration-500 hover:bg-blue-400 cursor-pointer"
          style={{ height: `${(value / 80) * 100}%` }}
        />
        
       
        <div className="text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wider">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}
        </div>
      </div>
    ))}
  </div>
          </div>
        </div>
      )}

      {/* ==================== APPLICANTS TAB ==================== */}
      {activeTab === "applicants" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Applicants</h2>
            <div className="text-sm text-gray-500">
              Showing {applicants.length} applicants
            </div>
          </div>

          <div className="space-y-4">
            {applicants.map((app) => (
              <div key={app.id} className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                
                {/* Avatar + Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {app.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{app.name}</div>
                    <div className="text-sm text-gray-500">{app.university} • GPA {app.gpa}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Applied {app.applied}</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 flex-1 md:justify-center">
                  {app.skills.map(skill => (
                    <span key={skill} className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Status & Action */}
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                  <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                    {getStatusLabel(app.status)}
                  </div>

                  <select
                    value={app.status}
                    onChange={(e) => changeStatus(app.id, e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="interview">Interview</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== LISTINGS TAB ==================== */}
      {activeTab === "listings" && (
        <div>
          <h2 className="text-xl font-semibold mb-6">My Active Listings</h2>
          
          <div className="space-y-4">
            {MOCK_INTERNSHIPS.slice(0, 4).map((internship) => (
              <div key={internship.id} className="bg-white rounded-3xl border border-gray-100 p-6 flex items-center gap-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
                  style={{backgroundColor: internship.logoColor + "15", color: internship.logoColor}}
                >
                  {internship.logo}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg truncate">{internship.title}</div>
                  <div className="text-gray-500 text-sm">{internship.company} • {internship.location}</div>
                </div>

                <div className="hidden md:block text-center">
                  <div className="text-sm font-medium text-green-600">{internship.applicants} applicants</div>
                  <div className="text-xs text-gray-400">this month</div>
                </div>

                <div className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Active
                </div>

                <button onClick={() => alert("Edit listing feature coming soon!")} className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                  <Edit size={20} className="text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}